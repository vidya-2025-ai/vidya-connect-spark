
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all community posts
router.get('/posts', async (req, res) => {
  try {
    // Fetch community posts logic would go here
    // For now, returning mock data
    const posts = [
      {
        id: '1',
        title: 'Tips for successful internship interviews',
        content: 'Preparing for internship interviews can be challenging...',
        author: {
          id: '101',
          name: 'Anjali Sharma',
          role: 'student'
        },
        likes: 24,
        comments: 8,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'What recruiters look for in an intern',
        content: 'From my experience hiring interns across various roles...',
        author: {
          id: '102',
          name: 'Raj Patel',
          role: 'recruiter'
        },
        likes: 56,
        comments: 12,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new community post
router.post('/posts', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // Create post logic would go here
    // For now, returning mock response
    const post = {
      id: Math.random().toString(36).substring(2, 15),
      title,
      content,
      author: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        role: req.user.role
      },
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get comments for a post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    
    // Fetch comments logic would go here
    // For now, returning mock data
    const comments = [
      {
        id: '101',
        content: 'Great post! This was really helpful.',
        author: {
          id: '201',
          name: 'Priya Singh',
          role: 'student'
        },
        createdAt: new Date().toISOString()
      },
      {
        id: '102',
        content: 'I would also add that being proactive is key.',
        author: {
          id: '202',
          name: 'Vikram Mehta',
          role: 'recruiter'
        },
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];
    
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comment to a post
router.post('/posts/:postId/comments', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    // Add comment logic would go here
    // For now, returning mock response
    const comment = {
      id: Math.random().toString(36).substring(2, 15),
      content,
      author: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        role: req.user.role
      },
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
