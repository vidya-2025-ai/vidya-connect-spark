
const express = require('express');
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');
const router = express.Router();

// Get all resumes for a user
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resume by id
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const resume = await Resume.findById(id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Ensure user owns this resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new resume
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      personalInfo,
      education,
      experience,
      skills,
      projects,
      certifications
    } = req.body;
    
    const resume = new Resume({
      user: req.user.id,
      title,
      personalInfo,
      education,
      experience,
      skills,
      projects,
      certifications,
      lastUpdated: new Date()
    });
    
    await resume.save();
    
    res.status(201).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update resume
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const resume = await Resume.findById(id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Ensure user owns this resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const {
      title,
      personalInfo,
      education,
      experience,
      skills,
      projects,
      certifications
    } = req.body;
    
    // Update fields if provided
    if (title) resume.title = title;
    if (personalInfo) resume.personalInfo = personalInfo;
    if (education) resume.education = education;
    if (experience) resume.experience = experience;
    if (skills) resume.skills = skills;
    if (projects) resume.projects = projects;
    if (certifications) resume.certifications = certifications;
    
    resume.lastUpdated = new Date();
    
    await resume.save();
    
    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
