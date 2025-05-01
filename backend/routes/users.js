
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      organization: user.organization,
      jobTitle: user.jobTitle,
      skills: user.skills,
      bio: user.bio,
      avatar: user.avatar,
      education: user.education,
      experience: user.experience,
      socialLinks: user.socialLinks,
      preferences: user.preferences
    });
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
      organization,
      jobTitle,
      skills,
      bio,
      avatar,
      education,
      experience,
      socialLinks
    } = req.body;
    
    // Build profile object
    const profileFields = {};
    
    if (firstName) profileFields.firstName = firstName;
    if (lastName) profileFields.lastName = lastName;
    if (organization) profileFields.organization = organization;
    if (jobTitle) profileFields.jobTitle = jobTitle;
    if (skills) profileFields.skills = skills;
    if (bio) profileFields.bio = bio;
    if (avatar) profileFields.avatar = avatar;
    if (education) profileFields.education = education;
    if (experience) profileFields.experience = experience;
    if (socialLinks) profileFields.socialLinks = socialLinks;
    
    // Update lastActive
    profileFields.lastActive = Date.now();
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      organization: user.organization,
      jobTitle: user.jobTitle,
      skills: user.skills,
      bio: user.bio,
      avatar: user.avatar,
      education: user.education,
      experience: user.experience,
      socialLinks: user.socialLinks,
      preferences: user.preferences
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user preferences
router.put('/preferences', auth, async (req, res) => {
  try {
    const { preferences } = req.body;
    
    if (!preferences) {
      return res.status(400).json({ message: 'Preferences are required' });
    }
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { preferences } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      preferences: user.preferences
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }
    
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get users for mentorship (for students) or talent search (for recruiters)
router.get('/search', auth, async (req, res) => {
  try {
    const { role, skills, name } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by role if specified
    if (role) {
      query.role = role;
    }
    
    // Filter by name if specified
    if (name) {
      const nameRegex = new RegExp(name, 'i');
      query.$or = [
        { firstName: nameRegex },
        { lastName: nameRegex }
      ];
    }
    
    // Filter by skills if specified
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray };
    }
    
    // Find users
    const users = await User.find(query)
      .select('-password')
      .limit(20);
    
    // Format the response
    const formattedUsers = users.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      organization: user.organization,
      jobTitle: user.jobTitle,
      skills: user.skills,
      bio: user.bio,
      avatar: user.avatar
    }));
    
    res.json(formattedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
