
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');

// Get dashboard statistics for recruiter
router.get('/recruiter/stats', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Get all opportunities by this recruiter
    const activeOpportunities = await Opportunity.find({ 
      organization: req.user.id,
      isActive: true 
    });
    
    // Get opportunity IDs
    const opportunityIds = activeOpportunities.map(opp => opp._id);
    
    // Get applications for the recruiter's opportunities
    const applications = await Application.find({
      opportunity: { $in: opportunityIds }
    });
    
    // Count interviews scheduled
    const interviewsScheduled = applications.filter(app => 
      app.status === 'Interview' && app.interviewDate
    ).length;
    
    // Get mentorship matches (placeholder - would typically link to a mentorship service)
    // This is a simplified example - real implementation would query a mentorship collection
    const mentorshipMatches = Math.floor(Math.random() * 30);
    
    res.json({
      activeJobs: activeOpportunities.length,
      totalApplications: applications.length,
      interviewsScheduled,
      mentorshipMatches
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent applications for recruiter
router.get('/recruiter/recent', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { limit = 5 } = req.query;
    
    // Get all opportunities by this recruiter
    const opportunities = await Opportunity.find({ 
      organization: req.user.id 
    });
    
    // Get opportunity IDs
    const opportunityIds = opportunities.map(opp => opp._id);
    
    // Get recent applications
    const recentApplications = await Application.find({
      opportunity: { $in: opportunityIds }
    })
    .populate('student', 'firstName lastName email avatar skills')
    .populate('opportunity', 'title type')
    .sort({ appliedDate: -1 })
    .limit(parseInt(limit));
    
    res.json(recentApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
