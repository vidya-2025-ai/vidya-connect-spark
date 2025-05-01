
const express = require('express');
const auth = require('../middleware/auth');
const { Post } = require('../models/Community');
const User = require('../models/User');
const router = express.Router();

// Get all community posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    
    // Format the response
    const formattedPosts = posts.map(post => ({
      id: post._id,
      title: post.title,
      content: post.content,
      author: {
        id: post.author,
        name: post.authorName,
        role: post.authorRole
      },
      likes: post.likes.length,
      comments: post.comments.length,
      createdAt: post.createdAt
    }));
    
    res.json(formattedPosts);
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
    
    // Get user data
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create post
    const post = new Post({
      title,
      content,
      author: req.user.id,
      authorName: `${user.firstName} ${user.lastName}`,
      authorRole: user.role
    });
    
    await post.save();
    
    res.status(201).json({
      id: post._id,
      title: post.title,
      content: post.content,
      author: {
        id: post.author,
        name: post.authorName,
        role: post.authorRole
      },
      likes: 0,
      comments: 0,
      createdAt: post.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get comments for a post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    
    // Find post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Format the response
    const comments = post.comments.map(comment => ({
      id: comment._id,
      content: comment.content,
      author: {
        id: comment.author,
        name: comment.authorName,
        role: comment.authorRole
      },
      createdAt: comment.createdAt
    }));
    
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
    
    // Find post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Get user data
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create comment
    const comment = {
      content,
      author: req.user.id,
      authorName: `${user.firstName} ${user.lastName}`,
      authorRole: user.role,
      createdAt: new Date()
    };
    
    // Add comment to post
    post.comments.push(comment);
    await post.save();
    
    // Get the newly added comment
    const newComment = post.comments[post.comments.length - 1];
    
    res.status(201).json({
      id: newComment._id,
      content: newComment.content,
      author: {
        id: newComment.author,
        name: newComment.authorName,
        role: newComment.authorRole
      },
      createdAt: newComment.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like a post
router.post('/posts/:postId/like', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    
    // Find post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user already liked the post
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'You already liked this post' });
    }
    
    // Add user to likes
    post.likes.push(req.user.id);
    await post.save();
    
    res.json({
      id: post._id,
      likes: post.likes.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unlike a post
router.post('/posts/:postId/unlike', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    
    // Find post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user liked the post
    const likeIndex = post.likes.indexOf(req.user.id);
    if (likeIndex === -1) {
      return res.status(400).json({ message: 'You have not liked this post' });
    }
    
    // Remove user from likes
    post.likes.splice(likeIndex, 1);
    await post.save();
    
    res.json({
      id: post._id,
      likes: post.likes.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
