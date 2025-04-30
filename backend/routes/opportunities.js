
const express = require('express');
const auth = require('../middleware/auth');
const Opportunity = require('../models/Opportunity');
const router = express.Router();

// Get all opportunities
router.get('/', async (req, res) => {
  try {
    const { search, type, skills } = req.query;
    
    let query = { isActive: true };
    
    // Add search query if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add type filter if provided
    if (type) {
      query.type = type;
    }
    
    // Add skills filter if provided
    if (skills) {
      const skillsArray = skills.split(',');
      query.skillsRequired = { $in: skillsArray };
    }
    
    const opportunities = await Opportunity.find(query)
      .populate('organization', 'firstName lastName organization')
      .sort({ createdAt: -1 });
      
    res.json(opportunities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get opportunities posted by recruiter
router.get('/recruiter', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const opportunities = await Opportunity.find({ organization: req.user.id })
      .sort({ createdAt: -1 });
      
    res.json(opportunities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new opportunity
router.post('/', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { 
      title, 
      description, 
      requirements, 
      location, 
      type, 
      duration, 
      stipend, 
      deadline, 
      skillsRequired,
      tags
    } = req.body;
    
    const opportunity = new Opportunity({
      title,
      organization: req.user.id,
      description,
      requirements,
      location,
      type,
      duration,
      stipend,
      deadline,
      skillsRequired,
      tags
    });
    
    await opportunity.save();
    
    res.status(201).json(opportunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get opportunity by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const opportunity = await Opportunity.findById(id)
      .populate('organization', 'firstName lastName organization');
      
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    
    res.json(opportunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update opportunity
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const opportunity = await Opportunity.findById(id);
    
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    
    // Ensure user is the creator of this opportunity
    if (opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { 
      title, 
      description, 
      requirements, 
      location, 
      type, 
      duration, 
      stipend, 
      deadline, 
      skillsRequired,
      tags,
      isActive
    } = req.body;
    
    // Update fields if provided
    if (title) opportunity.title = title;
    if (description) opportunity.description = description;
    if (requirements) opportunity.requirements = requirements;
    if (location) opportunity.location = location;
    if (type) opportunity.type = type;
    if (duration) opportunity.duration = duration;
    if (stipend) opportunity.stipend = stipend;
    if (deadline) opportunity.deadline = deadline;
    if (skillsRequired) opportunity.skillsRequired = skillsRequired;
    if (tags) opportunity.tags = tags;
    if (isActive !== undefined) opportunity.isActive = isActive;
    
    await opportunity.save();
    
    res.json(opportunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
