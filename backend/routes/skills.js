
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

// Get skills by category
router.get('/categories', async (req, res) => {
  try {
    const categories = await Skill.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json(categories.map(c => ({ category: c._id, count: c.count })));
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

// Get assessment data for recruiter dashboard
router.get('/assessments/stats', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Get top skills in the platform
    const topSkills = await Skill.aggregate([
      { $lookup: {
          from: 'userskills',
          localField: '_id',
          foreignField: 'skill',
          as: 'userSkills'
        }
      },
      { $project: {
          name: 1,
          category: 1,
          userCount: { $size: '$userSkills' },
          averageScore: { $avg: '$userSkills.level' }
        }
      },
      { $sort: { userCount: -1 } },
      { $limit: 10 }
    ]);
    
    // Get skill distribution by category
    const skillsByCategory = await Skill.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get assessment score distribution
    const assessmentScores = await UserSkill.aggregate([
      { $group: {
          _id: { $floor: { $divide: ["$level", 1] } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      topSkills,
      skillsByCategory: skillsByCategory.map(c => ({ category: c._id, count: c.count })),
      assessmentScores: assessmentScores.map(s => ({ score: s._id, count: s.count }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
