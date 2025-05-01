
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Mentorship = require('../models/Mentorship');

// Get available mentors
router.get('/mentors', auth, async (req, res) => {
  try {
    const mentors = await User.find({ 
      role: 'recruiter',
    }).select('-password');
    
    res.json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all mentorship requests for a user
router.get('/', auth, async (req, res) => {
  try {
    // Get all mentorships where user is either mentor or student
    const mentorships = await Mentorship.find({
      $or: [
        { mentor: req.user.id },
        { student: req.user.id }
      ]
    })
    .populate('mentor', 'firstName lastName organization jobTitle avatar')
    .populate('student', 'firstName lastName avatar')
    .sort({ createdAt: -1 });
    
    res.json(mentorships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's mentorship requests
router.get('/my', auth, async (req, res) => {
  try {
    // If student, get mentorships where user is student
    // If recruiter, get mentorships where user is mentor
    const query = req.user.role === 'student' 
      ? { student: req.user.id }
      : { mentor: req.user.id };
    
    const mentorships = await Mentorship.find(query)
      .populate('mentor', 'firstName lastName organization jobTitle avatar')
      .populate('student', 'firstName lastName avatar')
      .sort({ createdAt: -1 });
    
    res.json(mentorships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create mentorship request
router.post('/request', auth, async (req, res) => {
  try {
    // Ensure user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can request mentorship' });
    }
    
    const { mentorId, message } = req.body;
    
    if (!mentorId || !message) {
      return res.status(400).json({ message: 'Mentor ID and message are required' });
    }
    
    // Check if mentor exists and is a recruiter
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'recruiter') {
      return res.status(404).json({ message: 'Invalid mentor' });
    }
    
    // Check if mentorship request already exists
    const existingRequest = await Mentorship.findOne({
      mentor: mentorId,
      student: req.user.id,
      status: { $in: ['pending', 'accepted'] }
    });
    
    if (existingRequest) {
      return res.status(400).json({ message: 'Mentorship request already exists' });
    }
    
    // Create mentorship request
    const mentorship = new Mentorship({
      mentor: mentorId,
      student: req.user.id,
      message
    });
    
    await mentorship.save();
    
    // Populate mentor and student data
    await mentorship.populate('mentor', 'firstName lastName organization jobTitle avatar');
    await mentorship.populate('student', 'firstName lastName avatar');
    
    res.status(201).json(mentorship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update mentorship status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }
    
    // Find mentorship request
    const mentorship = await Mentorship.findById(id);
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship request not found' });
    }
    
    // Ensure user is the mentor of this request
    if (mentorship.mentor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Update status
    mentorship.status = status;
    mentorship.updatedAt = Date.now();
    await mentorship.save();
    
    // Populate mentor and student data
    await mentorship.populate('mentor', 'firstName lastName organization jobTitle avatar');
    await mentorship.populate('student', 'firstName lastName avatar');
    
    res.json(mentorship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
