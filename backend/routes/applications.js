const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// Get all applications for current student with pagination
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build the query
    let query = { student: req.user.id };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate('opportunity')
      .sort({ appliedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalCount = await Application.countDocuments(query);

    res.json({
      applications,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for a specific opportunity with filtering (for recruiters)
router.get('/opportunity/:opportunityId', auth, async (req, res) => {
  try {
    const { opportunityId } = req.params;
    const { status, page = 1, limit = 10, sortBy = 'appliedDate', sortOrder = 'desc' } = req.query;

    // Check if user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Check if the opportunity belongs to the recruiter
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Build the query
    let query = { opportunity: opportunityId };
    if (status) {
      query.status = status;
    }

    // Set up pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Set up sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const applications = await Application.find(query)
      .populate('student', 'firstName lastName email avatar skills')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalCount = await Application.countDocuments(query);

    res.json({
      applications,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications for recruiter across all opportunities
router.get('/recruiter', auth, async (req, res) => {
  try {
    // Check if user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { page = 1, limit = 10, status, search } = req.query;
    
    // First get all opportunities by this recruiter
    const opportunities = await Opportunity.find({ organization: req.user.id });
    const opportunityIds = opportunities.map(opp => opp._id);
    
    // Build query for applications
    let query = { opportunity: { $in: opportunityIds } };
    if (status) {
      query.status = status;
    }
    
    // Handle search
    if (search) {
      const students = await User.find({
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      });
      
      const studentIds = students.map(student => student._id);
      if (studentIds.length > 0) {
        query.student = { $in: studentIds };
      }
    }
    
    // Set up pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const applications = await Application.find(query)
      .populate('student', 'firstName lastName email avatar')
      .populate('opportunity', 'title type')
      .sort({ appliedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    // Get total count for pagination
    const totalCount = await Application.countDocuments(query);

    res.json({
      applications,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply to an opportunity
router.post('/opportunity/:opportunityId', auth, async (req, res) => {
  try {
    const { opportunityId } = req.params;
    const { coverLetter, resumeUrl } = req.body;

    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can apply to opportunities' });
    }

    // Check if opportunity exists
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      student: req.user.id,
      opportunity: opportunityId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this opportunity' });
    }

    // Get student skills to calculate skill match
    const student = await User.findById(req.user.id);
    let skillMatch = 0;
    
    if (student.skills && student.skills.length > 0 && opportunity.skillsRequired && opportunity.skillsRequired.length > 0) {
      const matchingSkills = student.skills.filter(skill => 
        opportunity.skillsRequired.includes(skill)
      );
      
      skillMatch = Math.round((matchingSkills.length / opportunity.skillsRequired.length) * 100);
    }

    // Create new application
    const application = new Application({
      student: req.user.id,
      opportunity: opportunityId,
      coverLetter,
      resumeUrl,
      status: 'Pending',
      skillMatch,
      activities: [{
        type: 'Application Submitted',
        description: 'Application was submitted by the student'
      }]
    });

    await application.save();

    // Add the application to the opportunity's applications array
    opportunity.applications.push(application._id);
    opportunity.applicationCount += 1;
    await opportunity.save();

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (for recruiters)
router.put('/:applicationId/status', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Check if user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Find the application
    const application = await Application.findById(applicationId).populate('opportunity');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the opportunity belongs to the recruiter
    if (application.opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update status and add activity
    application.status = status;
    application.lastUpdated = Date.now();
    application.activities.push({
      type: 'Status Update',
      description: `Application status changed to ${status}`
    });

    await application.save();

    // If status is Interview, notify student (would normally send email)
    if (status === 'Interview') {
      console.log(`Student ${application.student} should be notified about interview opportunity`);
      // In real implementation, would trigger email notification here
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Schedule an interview for an application
router.put('/:applicationId/interview', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { interviewDate } = req.body;

    // Check if user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Find the application
    const application = await Application.findById(applicationId).populate('opportunity');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the opportunity belongs to the recruiter
    if (application.opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update interview date and status
    application.interviewDate = new Date(interviewDate);
    application.status = 'Interview';
    application.lastUpdated = Date.now();
    application.activities.push({
      type: 'Interview Scheduled',
      description: `Interview scheduled for ${new Date(interviewDate).toLocaleDateString()}`
    });

    await application.save();

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a note to an application (for recruiters)
router.post('/:applicationId/notes', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { note } = req.body;

    // Check if user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Find the application
    const application = await Application.findById(applicationId).populate('opportunity');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the opportunity belongs to the recruiter
    if (application.opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    application.notes = note;
    application.lastUpdated = Date.now();
    application.activities.push({
      type: 'Note Added',
      description: 'Recruiter added a note to the application'
    });

    await application.save();

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add feedback to an application
router.post('/:applicationId/feedback', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { feedback, rating } = req.body;

    // Check if user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Find the application
    const application = await Application.findById(applicationId).populate('opportunity');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the opportunity belongs to the recruiter
    if (application.opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update feedback
    if (feedback) application.feedback = feedback;
    if (rating) application.rating = rating;
    
    application.lastUpdated = Date.now();
    application.activities.push({
      type: 'Feedback Added',
      description: 'Recruiter added feedback to the application'
    });

    await application.save();

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comprehensive review to an application
router.post('/:applicationId/review', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { strengths, weaknesses, overallAssessment, recommendationLevel } = req.body;

    // Check if user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Find the application
    const application = await Application.findById(applicationId).populate('opportunity');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the opportunity belongs to the recruiter
    if (application.opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update review information
    application.review = {
      strengths: strengths || [],
      weaknesses: weaknesses || [],
      overallAssessment: overallAssessment || '',
      recommendationLevel: recommendationLevel || 'Neutral',
      reviewDate: Date.now()
    };
    
    application.lastUpdated = Date.now();
    application.activities.push({
      type: 'Review Added',
      description: 'Recruiter added a comprehensive review'
    });

    await application.save();

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single application with detail
router.get('/:applicationId', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate('student', 'firstName lastName email avatar skills education experience')
      .populate('opportunity');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check authorization - either the student who applied or the recruiter who posted the opportunity
    if (
      req.user.id !== application.student._id.toString() && 
      req.user.id !== application.opportunity.organization.toString()
    ) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
