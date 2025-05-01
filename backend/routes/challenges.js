
const express = require('express');
const auth = require('../middleware/auth');
const { Challenge, Solution } = require('../models/Challenge');
const User = require('../models/User');
const router = express.Router();

// Get all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find({ isActive: true })
      .sort({ createdAt: -1 });
      
    // Format the response
    const formattedChallenges = challenges.map(challenge => ({
      id: challenge._id,
      title: challenge.title,
      description: challenge.description,
      organization: challenge.organizationName,
      skillsRequired: challenge.skillsRequired,
      deadline: challenge.deadline,
      submissionCount: challenge.solutions.length,
      createdAt: challenge.createdAt
    }));
    
    res.json(formattedChallenges);
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
      deadline
    } = req.body;
    
    if (!title || !description || !deadline) {
      return res.status(400).json({ message: 'Title, description, and deadline are required' });
    }
    
    // Get user details
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create challenge
    const challenge = new Challenge({
      title,
      description,
      organization: req.user.id,
      organizationName: user.organization || `${user.firstName} ${user.lastName}`,
      skillsRequired: skillsRequired || [],
      deadline: new Date(deadline)
    });
    
    await challenge.save();
    
    res.status(201).json({
      id: challenge._id,
      title: challenge.title,
      description: challenge.description,
      organization: challenge.organizationName,
      skillsRequired: challenge.skillsRequired,
      deadline: challenge.deadline,
      submissionCount: 0,
      createdAt: challenge.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit solution to a challenge (students only)
router.post('/:challengeId/solutions', auth, async (req, res) => {
  try {
    // Ensure user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can submit solutions' });
    }
    
    const { challengeId } = req.params;
    const { content, attachments } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Solution content is required' });
    }
    
    // Find challenge
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Check if deadline is passed
    if (new Date() > new Date(challenge.deadline)) {
      return res.status(400).json({ message: 'Deadline for this challenge has passed' });
    }
    
    // Check if user already submitted a solution
    const existingSolution = await Solution.findOne({
      challenge: challengeId,
      student: req.user.id
    });
    
    if (existingSolution) {
      return res.status(400).json({ message: 'You have already submitted a solution for this challenge' });
    }
    
    // Get user details
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create solution
    const solution = new Solution({
      challenge: challengeId,
      student: req.user.id,
      studentName: `${user.firstName} ${user.lastName}`,
      content,
      attachments: attachments || []
    });
    
    await solution.save();
    
    // Update challenge with solution reference
    challenge.solutions.push(solution._id);
    await challenge.save();
    
    res.status(201).json({
      id: solution._id,
      challenge: challengeId,
      student: {
        id: req.user.id,
        name: `${user.firstName} ${user.lastName}`
      },
      content: solution.content,
      attachments: solution.attachments,
      status: 'submitted',
      submittedAt: solution.submittedAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all solutions for a challenge (recruiter only)
router.get('/:challengeId/solutions', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { challengeId } = req.params;
    
    // Find challenge to check ownership
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Ensure the recruiter is the owner of the challenge
    if (challenge.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Get all solutions for this challenge
    const solutions = await Solution.find({ challenge: challengeId });
    
    // Format the response
    const formattedSolutions = solutions.map(solution => ({
      id: solution._id,
      student: {
        id: solution.student,
        name: solution.studentName
      },
      content: solution.content,
      attachments: solution.attachments,
      status: solution.evaluation ? 'evaluated' : 'submitted',
      score: solution.evaluation ? solution.evaluation.score : undefined,
      feedback: solution.evaluation ? solution.evaluation.feedback : undefined,
      submittedAt: solution.submittedAt
    }));
    
    res.json(formattedSolutions);
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
    
    if (score < 0 || score > 100) {
      return res.status(400).json({ message: 'Score must be between 0 and 100' });
    }
    
    // Find solution
    const solution = await Solution.findById(solutionId);
    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    
    // Find challenge to check ownership
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Ensure the recruiter is the owner of the challenge
    if (challenge.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Add evaluation
    solution.evaluation = {
      score,
      feedback,
      evaluatedBy: req.user.id,
      evaluatedAt: new Date()
    };
    
    await solution.save();
    
    res.json({
      id: solution._id,
      status: 'evaluated',
      score,
      feedback,
      evaluatedAt: solution.evaluation.evaluatedAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
