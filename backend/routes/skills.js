
const express = require('express');
const auth = require('../middleware/auth');
const { Skill, UserSkill } = require('../models/Skill');
const router = express.Router();

// Get all skills
router.get('/all', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user skills
router.get('/user', auth, async (req, res) => {
  try {
    const userSkills = await UserSkill.find({ user: req.user.id })
      .populate('skill');
    
    res.json(userSkills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add user skill
router.post('/user', auth, async (req, res) => {
  try {
    const { skillId, level } = req.body;
    
    // Check if skill exists
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    // Check if user already has this skill
    let userSkill = await UserSkill.findOne({ 
      user: req.user.id, 
      skill: skillId 
    });
    
    if (userSkill) {
      // Update level if skill already exists
      userSkill.level = level;
    } else {
      // Create new user skill
      userSkill = new UserSkill({
        user: req.user.id,
        skill: skillId,
        level
      });
    }
    
    await userSkill.save();
    
    res.json(userSkill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add skill assessment
router.post('/user/:skillId/assessment', auth, async (req, res) => {
  try {
    const { skillId } = req.params;
    const { score, certificateId } = req.body;
    
    // Find user skill
    const userSkill = await UserSkill.findOne({
      user: req.user.id,
      skill: skillId
    });
    
    if (!userSkill) {
      return res.status(404).json({ message: 'User skill not found' });
    }
    
    // Add assessment
    userSkill.assessments.push({
      score,
      certificate: certificateId
    });
    
    await userSkill.save();
    
    res.json(userSkill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
