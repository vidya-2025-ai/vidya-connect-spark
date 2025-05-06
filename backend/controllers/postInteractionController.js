
const { Post } = require('../models/Community');

// Like a post
exports.likePost = async (req, res) => {
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
};

// Unlike a post
exports.unlikePost = async (req, res) => {
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
};
