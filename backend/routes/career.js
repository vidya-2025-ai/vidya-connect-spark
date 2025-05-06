
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { Skill, UserSkill } = require('../models/Skill');
const router = express.Router();

// Get user career paths and milestones
router.get('/paths', auth, async (req, res) => {
  try {
    // Get user info
    const user = await User.findById(req.user.id).select('careerInterests');
    
    // Mock data structure for now - in production this would be stored in MongoDB
    const careerPaths = [
      { id: 1, name: "Frontend Development", progress: 65, level: "Intermediate" },
      { id: 2, name: "UX/UI Design", progress: 42, level: "Beginner" },
      { id: 3, name: "Data Analysis", progress: 28, level: "Beginner" },
    ];

    const milestones = [
      { id: 1, name: "HTML & CSS Mastery", completed: true, pathId: 1 },
      { id: 2, name: "JavaScript Fundamentals", completed: true, pathId: 1 },
      { id: 3, name: "React Basics", completed: true, pathId: 1 },
      { id: 4, name: "Redux & State Management", completed: false, pathId: 1 },
      { id: 5, name: "Advanced React Patterns", completed: false, pathId: 1 },
      { id: 6, name: "UI Design Principles", completed: true, pathId: 2 },
      { id: 7, name: "User Research Methods", completed: true, pathId: 2 },
      { id: 8, name: "Wireframing & Prototyping", completed: false, pathId: 2 },
      { id: 9, name: "Figma Advanced Techniques", completed: false, pathId: 2 },
      { id: 10, name: "Excel & SQL Basics", completed: true, pathId: 3 },
      { id: 11, name: "Data Visualization", completed: false, pathId: 3 },
      { id: 12, name: "Python for Data Analysis", completed: false, pathId: 3 },
    ];

    res.json({
      careerPaths,
      milestones,
      interests: user.careerInterests || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recommended jobs based on user skills and career paths
router.get('/recommended-jobs', auth, async (req, res) => {
  try {
    // Get user skills
    const userSkills = await UserSkill.find({ user: req.user.id })
      .populate('skill', 'name');
    
    // Get user info
    const user = await User.findById(req.user.id).select('careerInterests');
    
    // Mock data structure for now - in production this would match against actual job postings
    const recommendedJobs = [
      {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechCorp",
        match: 92,
        skills: ["React", "JavaScript", "CSS"]
      },
      {
        id: 2,
        title: "UI/UX Design Assistant",
        company: "DesignStudio",
        match: 85,
        skills: ["Figma", "UI Design", "Wireframing"]
      },
      {
        id: 3,
        title: "Junior Data Analyst",
        company: "DataInsights",
        match: 78,
        skills: ["Excel", "SQL", "Data Visualization"]
      }
    ];

    res.json(recommendedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user career interests
router.put('/interests', auth, async (req, res) => {
  try {
    const { interests } = req.body;
    
    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ message: 'Interests must be an array' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { careerInterests: interests } },
      { new: true }
    ).select('careerInterests');
    
    res.json({ interests: user.careerInterests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get learning paths
router.get('/learning-paths', auth, async (req, res) => {
  try {
    // Mock data structure for now - in production this would be stored in MongoDB
    const learningPaths = [
      { id: 1, name: "Full-Stack Development", progress: 45, modules: 12 },
      { id: 2, name: "UI/UX Design Fundamentals", progress: 60, modules: 8 },
      { id: 3, name: "Data Science Essentials", progress: 25, modules: 15 },
    ];
    
    res.json(learningPaths);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get projects 
router.get('/projects', auth, async (req, res) => {
  try {
    // Mock data structure for now - in production this would be stored in MongoDB
    const projects = [
      { id: 1, name: "E-commerce Website", tags: ["React", "Node.js"], deadline: "2025-05-15" },
      { id: 2, name: "Mobile App Prototype", tags: ["Figma", "UI Design"], deadline: "2025-05-22" },
      { id: 3, name: "Data Visualization Dashboard", tags: ["Python", "D3.js"], deadline: "2025-06-01" },
    ];
    
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get personalized recommendations
router.get('/recommendations', auth, async (req, res) => {
  try {
    // Get user skills
    const userSkills = await UserSkill.find({ user: req.user.id })
      .populate('skill', 'name category');
    
    // Get skill categories from the user's skills
    const skillCategories = userSkills.map(us => us.skill.category).filter(Boolean);
    
    // Mock recommendations data
    const recommendations = {
      careerBased: [
        {
          id: 1,
          title: "React Advanced Concepts",
          description: "Take your React skills to the next level with this advanced course."
        },
        {
          id: 2,
          title: "UI/UX Portfolio Workshop",
          description: "Create stunning portfolio projects in this hands-on workshop."
        }
      ],
      trending: [
        {
          id: 1,
          title: "TypeScript Essentials",
          description: "Master TypeScript to improve your code quality and maintainability."
        },
        {
          id: 2,
          title: "Data Visualization with D3.js",
          description: "Create interactive data visualizations for your projects."
        }
      ]
    };
    
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
