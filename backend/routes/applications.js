
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// Get all applications for current student
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is a student
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

// Get applications for a specific opportunity (for recruiters)
router.get('/opportunity/:opportunityId', auth, async (req, res) => {
  try {
    const { opportunityId } = req.params;

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

    const applications = await Application.find({ opportunity: opportunityId })
      .populate('student', 'firstName lastName email avatar')
      .sort({ appliedDate: -1 });

    res.json(applications);
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

    // Create new application
    const application = new Application({
      student: req.user.id,
      opportunity: opportunityId,
      coverLetter,
      resumeUrl,
      status: 'Pending',
      activities: [{
        type: 'Application Submitted',
        description: 'Application was submitted by the student'
      }]
    });

    await application.save();

    // Add the application to the opportunity's applications array
    opportunity.applications.push(application._id);
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

module.exports = router;
