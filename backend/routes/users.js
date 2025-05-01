
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      bio, 
      skills, 
      organization,
      jobTitle,
      education,
      experience,
      socialLinks
    } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (organization) user.organization = organization;
    if (jobTitle) user.jobTitle = jobTitle;
    if (education) user.education = education;
    if (experience) user.experience = experience;
    if (socialLinks) user.socialLinks = socialLinks;
    
    await user.save();
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user dashboard stats
router.get('/dashboard-stats', auth, async (req, res) => {
  try {
    if (req.user.role === 'student') {
      // Student dashboard stats
      const stats = {
        applicationsSubmitted: 12,
        interviewsScheduled: 3,
        offersReceived: 1,
        certificatesEarned: 4,
        skillsInProgress: 8,
        completedChallenges: 5,
        mentorshipSessions: 3,
        upcomingEvents: 2
      };
      res.json(stats);
    } else if (req.user.role === 'recruiter') {
      // Recruiter dashboard stats
      const stats = {
        activeOpportunities: 7,
        totalApplications: 48,
        shortlistedCandidates: 15,
        interviewsScheduled: 8,
        pendingTasks: 4,
        newApplicants: 12,
        upcomingInterviews: 3,
        mentorshipRequests: 5
      };
      res.json(stats);
    } else {
      res.status(400).json({ message: 'Invalid user role' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID (for public profiles)
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password -email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return public profile
    const profile = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      bio: user.bio,
      skills: user.skills,
      organization: user.organization,
      jobTitle: user.jobTitle
    };
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search for users
router.get('/search/:query', auth, async (req, res) => {
  try {
    const { query } = req.params;
    
    if (!query || query.length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }
    
    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { organization: { $regex: query, $options: 'i' } }
      ]
    }).select('firstName lastName role organization jobTitle');
    
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
