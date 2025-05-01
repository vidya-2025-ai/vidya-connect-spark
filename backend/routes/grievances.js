
const express = require('express');
const auth = require('../middleware/auth');
const Grievance = require('../models/Grievance');
const User = require('../models/User');
const router = express.Router();

// Get all grievances relevant to user
router.get('/', auth, async (req, res) => {
  try {
    let grievances;
    
    // If recruiter, get all grievances
    // If student, get only their own grievances
    if (req.user.role === 'recruiter') {
      grievances = await Grievance.find().sort({ createdAt: -1 });
    } else {
      grievances = await Grievance.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    }
    
    // Format the response
    const formattedGrievances = grievances.map(grievance => ({
      id: grievance._id,
      title: grievance.title,
      description: grievance.description,
      status: grievance.status,
      createdBy: {
        id: grievance.createdBy,
        name: grievance.creatorName,
        role: grievance.creatorRole
      },
      responses: grievance.responses.map(response => ({
        id: response._id,
        content: response.content,
        responder: {
          id: response.responder,
          name: response.responderName,
          role: response.responderRole
        },
        createdAt: response.createdAt
      })),
      createdAt: grievance.createdAt
    }));
    
    res.json(formattedGrievances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// File a new grievance
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    // Get user data
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create new grievance
    const grievance = new Grievance({
      title,
      description,
      createdBy: req.user.id,
      creatorName: `${user.firstName} ${user.lastName}`,
      creatorRole: user.role
    });
    
    await grievance.save();
    
    res.status(201).json({
      id: grievance._id,
      title: grievance.title,
      description: grievance.description,
      status: grievance.status,
      createdBy: {
        id: grievance.createdBy,
        name: grievance.creatorName,
        role: grievance.creatorRole
      },
      responses: [],
      createdAt: grievance.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add response to a grievance
router.put('/:id/response', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Response content is required' });
    }
    
    // Find grievance
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    
    // Get user data
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create response
    const response = {
      content,
      responder: req.user.id,
      responderName: `${user.firstName} ${user.lastName}`,
      responderRole: user.role,
      createdAt: new Date()
    };
    
    // Add response to grievance
    grievance.responses.push(response);
    await grievance.save();
    
    // Get the newly added response
    const newResponse = grievance.responses[grievance.responses.length - 1];
    
    res.json({
      id: newResponse._id,
      content: newResponse.content,
      responder: {
        id: newResponse.responder,
        name: newResponse.responderName,
        role: newResponse.responderRole
      },
      createdAt: newResponse.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Close a grievance
router.put('/:id/close', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find grievance
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    
    // Check permission
    // Only the creator or a recruiter can close a grievance
    if (grievance.createdBy.toString() !== req.user.id && req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized to close this grievance' });
    }
    
    // Update status to closed
    grievance.status = 'closed';
    await grievance.save();
    
    res.json({ id, status: 'closed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
