
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all grievances relevant to user
router.get('/', auth, async (req, res) => {
  try {
    // Fetch grievances logic based on user role
    // For now, returning mock data
    const grievances = [
      {
        id: '1',
        title: 'Issue with internship supervisor',
        description: 'My supervisor has been assigning tasks outside the scope...',
        status: 'pending',
        createdBy: {
          id: '101',
          name: 'Aditya Kumar',
          role: 'student'
        },
        responses: [],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Stipend payment delayed',
        description: 'I have not received my stipend for the past month...',
        status: 'resolved',
        createdBy: {
          id: '102',
          name: 'Neha Patil',
          role: 'student'
        },
        responses: [
          {
            id: '201',
            content: 'We have processed the payment. It should reflect in 2-3 working days.',
            responder: {
              id: '301',
              name: 'HR Department',
              role: 'recruiter'
            },
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ],
        createdAt: new Date(Date.now() - 604800000).toISOString()
      }
    ];

    res.json(grievances);
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
    
    // Create grievance logic would go here
    // For now, returning mock response
    const grievance = {
      id: Math.random().toString(36).substring(2, 15),
      title,
      description,
      status: 'pending',
      createdBy: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        role: req.user.role
      },
      responses: [],
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(grievance);
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
    
    // Add response logic would go here
    // For now, returning mock response
    const response = {
      id: Math.random().toString(36).substring(2, 15),
      content,
      responder: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        role: req.user.role
      },
      createdAt: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Close a grievance
router.put('/:id/close', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Close grievance logic would go here
    // For now, returning mock response
    res.json({ id, status: 'closed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
