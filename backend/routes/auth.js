
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      role, 
      organization,
      jobTitle 
    } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create user object based on role
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role
    };
    
    // Add role-specific fields
    if (role === 'recruiter' && organization) {
      userData.organization = organization;
      if (jobTitle) userData.jobTitle = jobTitle;
    }
    
    // Create new user
    const user = new User(userData);
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    // Prepare response data removing sensitive information
    const responseUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };
    
    // Add role-specific fields to response
    if (user.role === 'recruiter') {
      responseUser.organization = user.organization;
      responseUser.jobTitle = user.jobTitle;
    }
    
    res.status(201).json({
      token,
      user: responseUser
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    // Update lastActive
    user.lastActive = Date.now();
    await user.save();
    
    // Prepare response data removing sensitive information
    const responseUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };
    
    // Add role-specific fields to response
    if (user.role === 'recruiter') {
      responseUser.organization = user.organization;
      responseUser.jobTitle = user.jobTitle;
    }
    
    res.json({
      token,
      user: responseUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout user (clears token on the client side, but we can add it for tracking purposes)
router.post('/logout', async (req, res) => {
  try {
    // In a more advanced implementation, we could add token to a blacklist
    // or track user logout activity
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
