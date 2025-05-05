
const express = require('express');
const auth = require('../middleware/auth');
const { Post } = require('../models/Community');
const User = require('../models/User');
const router = express.Router();

// Get all community posts for recruiter dashboard
router.get('/recruiter', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { page = 1, limit = 10, search, sortBy = 'latest' } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    // Search in title or content if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sort options
    let sort = { createdAt: -1 }; // Default sort by latest
    if (sortBy === 'popular') {
      sort = { 'likes.length': -1, createdAt: -1 };
    }
    
    // Get posts with pagination
    const posts = await Post.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const totalCount = await Post.countDocuments(query);
    
    // Format posts
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
    
    res.json({
      posts: formattedPosts,
      pagination: {
        totalCount,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get community statistics for recruiter dashboard
router.get('/statistics', auth, async (req, res) => {
  try {
    // Ensure user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Get all posts
    const posts = await Post.find();
    
    // Calculate statistics
    const totalPosts = posts.length;
    
    let totalComments = 0;
    let totalLikes = 0;
    
    posts.forEach(post => {
      totalComments += post.comments.length;
      totalLikes += post.likes.length;
    });
    
    // Posts in the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const activePosts = posts.filter(post => 
      new Date(post.createdAt) >= oneWeekAgo || 
      post.comments.some(comment => new Date(comment.createdAt) >= oneWeekAgo)
    ).length;
    
    // Top contributors
    const authorPosts = {};
    posts.forEach(post => {
      if (!authorPosts[post.author]) {
        authorPosts[post.author] = {
          count: 0,
          name: post.authorName,
          role: post.authorRole
        };
      }
      authorPosts[post.author].count++;
    });
    
    const topContributors = Object.entries(authorPosts)
      .map(([userId, data]) => ({
        userId,
        name: data.name,
        role: data.role,
        postCount: data.count
      }))
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);
    
    // Posts by day for the last 30 days
    const postsByDay = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const count = posts.filter(post => {
        const postDate = new Date(post.createdAt).toISOString().split('T')[0];
        return postDate === dateString;
      }).length;
      
      postsByDay.push({
        date: dateString,
        count
      });
    }
    
    res.json({
      totalPosts,
      totalComments,
      activePosts,
      totalLikes,
      topContributors,
      postsByDay
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all community posts
router.get('/posts', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, author, sortBy = 'latest' } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    // Search in title or content if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by author if provided
    if (author) {
      query.author = author;
    }
    
    // Sort options
    let sort = { createdAt: -1 }; // Default sort by latest
    if (sortBy === 'popular') {
      sort = { 'likes.length': -1, createdAt: -1 };
    }
    
    // Get posts with pagination
    const posts = await Post.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const totalCount = await Post.countDocuments(query);
    
    // Format posts
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
    
    res.json({
      posts: formattedPosts,
      pagination: {
        totalCount,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit)
      }
    });
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
