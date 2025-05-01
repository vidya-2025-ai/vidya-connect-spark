
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all micro-internships
router.get('/', async (req, res) => {
  try {
    // Fetch micro-internships logic would go here
    // For now, returning mock data
    const microInternships = [
      {
        id: '1',
        title: 'UI Design for Mobile App',
        description: 'Create UI designs for a fitness tracking mobile application.',
        organization: 'HealthTech Innovations',
        duration: '2 weeks',
        skillsRequired: ['UI Design', 'Figma', 'Mobile Design'],
        stipend: {
          amount: 5000,
          currency: 'INR'
        },
        deadline: new Date(Date.now() + 604800000).toISOString(),
        applicants: 18,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Content Writing for Blog',
        description: 'Write technical blog posts about emerging technologies.',
        organization: 'TechBlog Media',
        duration: '1 month',
        skillsRequired: ['Content Writing', 'SEO', 'Technical Knowledge'],
        stipend: {
          amount: 8000,
          currency: 'INR'
        },
        deadline: new Date(Date.now() + 432000000).toISOString(),
        applicants: 12,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    res.json(microInternships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new micro-internship (recruiters only)
router.post('/', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { 
      title, 
      description, 
      duration,
      skillsRequired,
      stipendAmount,
      stipendCurrency,
      deadline
    } = req.body;
    
    if (!title || !description || !duration) {
      return res.status(400).json({ message: 'Title, description, and duration are required' });
    }
    
    // Create micro-internship logic would go here
    // For now, returning mock response
    const microInternship = {
      id: Math.random().toString(36).substring(2, 15),
      title,
      description,
      organization: req.user.organization,
      duration,
      skillsRequired: skillsRequired || [],
      stipend: {
        amount: stipendAmount || 0,
        currency: stipendCurrency || 'INR'
      },
      deadline: deadline || new Date(Date.now() + 604800000).toISOString(),
      applicants: 0,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(microInternship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply to a micro-internship
router.post('/:internshipId/apply', auth, async (req, res) => {
  try {
    // Ensure user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can apply for micro-internships' });
    }
    
    const { internshipId } = req.params;
    
    // Apply logic would go here
    // For now, returning mock response
    const application = {
      id: Math.random().toString(36).substring(2, 15),
      internshipId,
      student: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`
      },
      status: 'pending',
      appliedAt: new Date().toISOString()
    };
    
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (recruiters only)
router.put('/applications/:applicationId/status', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { applicationId } = req.params;
    const { status } = req.body;
    
    if (!status || !['accepted', 'rejected', 'shortlisted'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }
    
    // Update status logic would go here
    // For now, returning mock response
    res.json({
      id: applicationId,
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
