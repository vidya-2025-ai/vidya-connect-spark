
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Skill, UserSkill } = require('../models/Skill');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${req.user.id}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

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

// Upload profile photo
router.post('/profile/photo', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the relative path to serve the image
    const relativePath = `/uploads/avatars/${req.file.filename}`;
    
    // Update the user's avatar field
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: relativePath },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ avatar: relativePath });
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
    const { role, skills, name, experienceLevel, education, location } = req.query;
    
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
    
    // Filter by experience level
    if (experienceLevel) {
      if (experienceLevel === 'entry') {
        query.yearsOfExperience = { $lte: 2 };
      } else if (experienceLevel === 'mid') {
        query.yearsOfExperience = { $gt: 2, $lte: 5 };
      } else if (experienceLevel === 'senior') {
        query.yearsOfExperience = { $gt: 5 };
      }
    }
    
    // Filter by location
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    
    // Find users with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ lastActive: -1 });
    
    // Get total count for pagination
    const total = await User.countDocuments(query);
    
    // Format the response
    const formattedUsers = users.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      organization: user.organization,
      jobTitle: user.jobTitle,
      skills: user.skills || [],
      bio: user.bio,
      avatar: user.avatar,
      location: user.location,
      yearsOfExperience: user.yearsOfExperience,
      education: user.education || [],
      availability: user.availability,
      profileCompleteness: user.profileCompleteness || 0
    }));
    
    res.json({
      candidates: formattedUsers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user skills assessment data
router.get('/:id/skills', auth, async (req, res) => {
  try {
    // Verify the requester is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized to view skill assessments' });
    }
    
    const { id } = req.params;
    
    // Get user skills with assessments
    const userSkills = await UserSkill.find({ user: id })
      .populate('skill')
      .sort({ level: -1 });
    
    if (!userSkills) {
      return res.json([]);
    }
    
    // Format the response
    const formattedSkills = userSkills.map(userSkill => ({
      id: userSkill._id,
      name: userSkill.skill.name,
      category: userSkill.skill.category,
      level: userSkill.level,
      assessments: userSkill.assessments || []
    }));
    
    res.json(formattedSkills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get candidate profile details
router.get('/:id/profile', auth, async (req, res) => {
  try {
    // Verify the requester is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized to view candidate profile' });
    }
    
    const { id } = req.params;
    
    // Get user profile
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      skills: user.skills || [],
      bio: user.bio || '',
      avatar: user.avatar,
      location: user.location || '',
      education: user.education || [],
      experience: user.experience || [],
      socialLinks: user.socialLinks || {},
      yearsOfExperience: user.yearsOfExperience || 0,
      availability: user.availability || 'Negotiable',
      careerInterests: user.careerInterests || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
