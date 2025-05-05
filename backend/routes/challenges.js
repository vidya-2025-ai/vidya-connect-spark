
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Challenge } = require('../models/Challenge');
const User = require('../models/User');

// Get all challenges by recruiter
router.get('/recruiter', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const challenges = await Challenge.find({ organization: req.user.id })
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
      createdAt: challenge.createdAt,
      isActive: challenge.isActive
    }));
    
    res.json({ challenges: formattedChallenges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get statistics for recruiter challenges
router.get('/recruiter/statistics', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const challenges = await Challenge.find({ organization: req.user.id });
    
    // Calculate statistics
    const totalChallenges = challenges.length;
    const activeChallenges = challenges.filter(ch => ch.isActive).length;
    const completedChallenges = challenges.filter(ch => !ch.isActive).length;
    
    let totalParticipants = 0;
    let totalSubmissions = 0;
    const skillCounts = {};
    
    challenges.forEach(challenge => {
      totalSubmissions += challenge.solutions.length;
      
      // Count unique participants
      const uniqueParticipants = new Set(challenge.solutions.map(sol => sol.student.toString()));
      totalParticipants += uniqueParticipants.size;
      
      // Track skills
      challenge.skillsRequired.forEach(skill => {
        if (!skillCounts[skill]) {
          skillCounts[skill] = 0;
        }
        skillCounts[skill]++;
      });
    });
    
    // Calculate average submissions
    const averageSubmissions = totalChallenges > 0 ? 
      (totalSubmissions / totalChallenges).toFixed(2) : 0;
    
    // Get top skills
    const topSkills = Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    res.json({
      totalChallenges,
      activeChallenges,
      completedChallenges,
      totalParticipants,
      averageSubmissions: parseFloat(averageSubmissions),
      topSkills
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
    
    res.json({
      challenges: formattedChallenges
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a challenge (recruiters only)
router.post('/', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { title, description, skillsRequired, deadline } = req.body;
    
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
      deadline: new Date(deadline),
      solutions: []
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

// Get challenge details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const challenge = await Challenge.findById(id);
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    res.json({
      id: challenge._id,
      title: challenge.title,
      description: challenge.description,
      organization: challenge.organizationName,
      skillsRequired: challenge.skillsRequired,
      deadline: challenge.deadline,
      submissionCount: challenge.solutions.length,
      createdAt: challenge.createdAt,
      isActive: challenge.isActive
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change challenge status (activate/deactivate)
router.put('/:id/status', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { id } = req.params;
    const { isActive } = req.body;
    
    // Find the challenge
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Ensure the recruiter is the owner of the challenge
    if (challenge.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Update challenge status
    challenge.isActive = isActive;
    await challenge.save();
    
    res.json({
      id: challenge._id,
      title: challenge.title,
      isActive: challenge.isActive
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit solution to a challenge
router.post('/:id/solutions', auth, async (req, res) => {
  try {
    // Ensure user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can submit solutions' });
    }
    
    const { id } = req.params;
    const { content, attachments } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Solution content is required' });
    }
    
    // Find the challenge
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Check if deadline has passed
    if (new Date() > new Date(challenge.deadline)) {
      return res.status(400).json({ message: 'Challenge deadline has passed' });
    }
    
    // Check if user already submitted a solution
    const existingSolution = challenge.solutions.find(
      solution => solution.student.toString() === req.user.id
    );
    
    if (existingSolution) {
      return res.status(400).json({ message: 'You have already submitted a solution' });
    }
    
    // Get user details
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create solution
    const solution = {
      student: req.user.id,
      studentName: `${user.firstName} ${user.lastName}`,
      content,
      attachments: attachments || []
    };
    
    // Add solution to challenge
    challenge.solutions.push(solution);
    await challenge.save();
    
    // Get the newly added solution
    const newSolution = challenge.solutions[challenge.solutions.length - 1];
    
    res.status(201).json({
      id: newSolution._id,
      challenge: id,
      student: {
        id: req.user.id,
        name: `${user.firstName} ${user.lastName}`
      },
      content: newSolution.content,
      attachments: newSolution.attachments,
      status: newSolution.status,
      submittedAt: newSolution.submittedAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get solutions for a challenge (for recruiters)
router.get('/:id/solutions', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { id } = req.params;
    
    // Find the challenge
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Ensure the recruiter is the owner of the challenge
    if (challenge.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Format the solutions
    const solutions = challenge.solutions.map(solution => ({
      id: solution._id,
      challenge: id,
      student: {
        id: solution.student,
        name: solution.studentName
      },
      content: solution.content,
      attachments: solution.attachments,
      score: solution.score,
      feedback: solution.feedback,
      status: solution.status,
      submittedAt: solution.submittedAt
    }));
    
    res.json(solutions);
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
    
    if (!score) {
      return res.status(400).json({ message: 'Score is required' });
    }
    
    // Find the challenge
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Ensure the recruiter is the owner of the challenge
    if (challenge.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Find the solution
    const solution = challenge.solutions.id(solutionId);
    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    
    // Update the solution
    solution.score = score;
    solution.feedback = feedback || '';
    solution.status = 'evaluated';
    
    await challenge.save();
    
    res.json({
      id: solution._id,
      challenge: challengeId,
      student: {
        id: solution.student,
        name: solution.studentName
      },
      content: solution.content,
      attachments: solution.attachments,
      score: solution.score,
      feedback: solution.feedback,
      status: solution.status,
      submittedAt: solution.submittedAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
