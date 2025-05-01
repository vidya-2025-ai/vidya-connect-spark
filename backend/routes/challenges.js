
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all challenges
router.get('/', async (req, res) => {
  try {
    // Fetch challenges logic would go here
    // For now, returning mock data
    const challenges = [
      {
        id: '1',
        title: 'Build a Responsive E-commerce Homepage',
        description: 'Create a responsive homepage for an online store using React and Tailwind CSS.',
        organization: 'TechFirst Solutions',
        skillsRequired: ['React', 'CSS', 'Tailwind', 'Responsive Design'],
        difficulty: 'Intermediate',
        deadline: new Date(Date.now() + 1209600000).toISOString(),
        participants: 42,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Optimize Database Queries',
        description: 'Analyze and optimize a set of SQL queries for better performance.',
        organization: 'DataSense Labs',
        skillsRequired: ['SQL', 'Database Optimization', 'Query Performance'],
        difficulty: 'Advanced',
        deadline: new Date(Date.now() + 864000000).toISOString(),
        participants: 28,
        createdAt: new Date(Date.now() - 259200000).toISOString()
      }
    ];

    res.json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new challenge (recruiters only)
router.post('/', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { 
      title, 
      description, 
      skillsRequired,
      difficulty,
      deadline
    } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    // Create challenge logic would go here
    // For now, returning mock response
    const challenge = {
      id: Math.random().toString(36).substring(2, 15),
      title,
      description,
      organization: req.user.organization,
      skillsRequired: skillsRequired || [],
      difficulty: difficulty || 'Intermediate',
      deadline: deadline || new Date(Date.now() + 1209600000).toISOString(),
      participants: 0,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(challenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit a solution to a challenge
router.post('/:challengeId/solutions', auth, async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { solutionUrl, comments } = req.body;
    
    if (!solutionUrl) {
      return res.status(400).json({ message: 'Solution URL is required' });
    }
    
    // Submit solution logic would go here
    // For now, returning mock response
    const solution = {
      id: Math.random().toString(36).substring(2, 15),
      challengeId,
      solutionUrl,
      comments,
      student: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`
      },
      status: 'submitted',
      evaluation: null,
      submittedAt: new Date().toISOString()
    };
    
    res.status(201).json(solution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Evaluate a solution (recruiters only)
router.put('/:challengeId/solutions/:solutionId/evaluate', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { challengeId, solutionId } = req.params;
    const { score, feedback } = req.body;
    
    if (!score || !feedback) {
      return res.status(400).json({ message: 'Score and feedback are required' });
    }
    
    // Evaluate solution logic would go here
    // For now, returning mock response
    const evaluation = {
      score,
      feedback,
      evaluator: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        organization: req.user.organization
      },
      evaluatedAt: new Date().toISOString()
    };
    
    res.json({
      id: solutionId,
      challengeId,
      status: 'evaluated',
      evaluation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
