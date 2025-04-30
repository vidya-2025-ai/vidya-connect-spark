
const express = require('express');
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const User = require('../models/User');
const router = express.Router();

// Get all applications for a student
router.get('/student', auth, async (req, res) => {
  try {
    // Ensure user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const applications = await Application.find({ student: req.user.id })
      .populate('opportunity')
      .sort({ appliedDate: -1 });
      
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications for a recruiter's opportunities
router.get('/recruiter', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Find all opportunities by this recruiter
    const opportunities = await Opportunity.find({ organization: req.user.id });
    const opportunityIds = opportunities.map(opp => opp._id);
    
    // Find all applications for these opportunities
    const applications = await Application.find({ opportunity: { $in: opportunityIds } })
      .populate('opportunity')
      .populate('student', '-password')
      .sort({ appliedDate: -1 });
      
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new application
router.post('/', auth, async (req, res) => {
  try {
    // Ensure user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { opportunityId, resumeUrl, coverLetter } = req.body;
    
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
      return res.status(400).json({ message: 'You have already applied for this opportunity' });
    }
    
    // Create new application
    const application = new Application({
      student: req.user.id,
      opportunity: opportunityId,
      resumeUrl,
      coverLetter,
      activities: [{
        type: 'Application Submitted',
        description: 'Application was submitted'
      }]
    });
    
    await application.save();
    
    // Add application to opportunity
    opportunity.applications.push(application._id);
    await opportunity.save();
    
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await Application.findById(id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Verify the recruiter owns this opportunity
    const opportunity = await Opportunity.findById(application.opportunity);
    if (!opportunity || opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Update status
    application.status = status;
    
    // Add activity
    application.activities.push({
      type: 'Status Update',
      description: `Application status updated to ${status}`
    });
    
    await application.save();
    
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get application details
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await Application.findById(id)
      .populate('opportunity')
      .populate('student', '-password');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user has permission to view this application
    const isStudent = req.user.role === 'student' && application.student._id.toString() === req.user.id;
    const isRecruiter = req.user.role === 'recruiter';
    
    if (!isStudent && !isRecruiter) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    if (isRecruiter) {
      // Verify the recruiter owns this opportunity
      const opportunity = await Opportunity.findById(application.opportunity);
      if (!opportunity || opportunity.organization.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    }
    
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
