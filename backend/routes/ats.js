
const express = require('express');
const auth = require('../middleware/auth');
const ATSParameter = require('../models/ATSParameter');
const Resume = require('../models/Resume');
const router = express.Router();

// Get ATS parameters for a recruiter
router.get('/parameters', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const parameters = await ATSParameter.find({ recruiter: req.user.id });
    res.json(parameters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new ATS parameters
router.post('/parameters', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const {
      name,
      requiredSkills,
      requiredExperience,
      requiredEducation,
      keywords,
      formatRequirements
    } = req.body;
    
    const parameter = new ATSParameter({
      recruiter: req.user.id,
      name,
      requiredSkills,
      requiredExperience,
      requiredEducation,
      keywords,
      formatRequirements
    });
    
    await parameter.save();
    
    res.status(201).json(parameter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update ATS parameters
router.put('/parameters/:id', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { id } = req.params;
    
    const parameter = await ATSParameter.findById(id);
    
    if (!parameter) {
      return res.status(404).json({ message: 'ATS parameter not found' });
    }
    
    // Ensure recruiter owns these parameters
    if (parameter.recruiter.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const {
      name,
      requiredSkills,
      requiredExperience,
      requiredEducation,
      keywords,
      formatRequirements,
      active
    } = req.body;
    
    // Update fields if provided
    if (name) parameter.name = name;
    if (requiredSkills) parameter.requiredSkills = requiredSkills;
    if (requiredExperience !== undefined) parameter.requiredExperience = requiredExperience;
    if (requiredEducation) parameter.requiredEducation = requiredEducation;
    if (keywords) parameter.keywords = keywords;
    if (formatRequirements) parameter.formatRequirements = formatRequirements;
    if (active !== undefined) parameter.active = active;
    
    await parameter.save();
    
    res.json(parameter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Calculate ATS score for a resume
router.post('/calculate-score', auth, async (req, res) => {
  try {
    const { resumeId, parameterId } = req.body;
    
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Ensure user owns this resume if they're a student
    if (req.user.role === 'student' && resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const parameter = await ATSParameter.findById(parameterId);
    if (!parameter) {
      return res.status(404).json({ message: 'ATS parameter not found' });
    }
    
    // Simple ATS score calculation (this would be more complex in a real application)
    let score = 0;
    let maxScore = 0;
    
    // Check for required skills
    parameter.requiredSkills.forEach(reqSkill => {
      maxScore += reqSkill.weight;
      if (resume.skills.includes(reqSkill.skill)) {
        score += reqSkill.weight;
      }
    });
    
    // Check for keywords in resume
    parameter.keywords.forEach(keyword => {
      maxScore += keyword.weight;
      
      // Check keywords in various sections (simplified approach)
      const resumeText = JSON.stringify(resume).toLowerCase();
      if (resumeText.includes(keyword.keyword.toLowerCase())) {
        score += keyword.weight;
      }
    });
    
    // Format requirements check
    if (parameter.formatRequirements) {
      if (parameter.formatRequirements.requiresContactInfo) {
        maxScore += 1;
        if (resume.personalInfo && resume.personalInfo.email && resume.personalInfo.phone) {
          score += 1;
        }
      }
      
      if (parameter.formatRequirements.requiresEducation) {
        maxScore += 1;
        if (resume.education && resume.education.length > 0) {
          score += 1;
        }
      }
    }
    
    const finalScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
    // Update the resume with the ATS score
    resume.atsScore = finalScore;
    await resume.save();
    
    res.json({ 
      score: finalScore,
      details: {
        matched: score,
        total: maxScore
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
