
const { Challenge } = require('../models/Challenge');
const User = require('../models/User');

// Submit solution to a challenge
exports.submitSolution = async (req, res) => {
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
};

// Get solutions for a challenge (for recruiters)
exports.getSolutions = async (req, res) => {
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
};

// Evaluate a solution (recruiters only)
exports.evaluateSolution = async (req, res) => {
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
};
