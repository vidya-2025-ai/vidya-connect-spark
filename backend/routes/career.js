
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/career/interests
// @desc    Get career interests categories
// @access  Public
router.get('/interests', async (req, res) => {
  try {
    // These would typically come from a database
    const careerInterests = [
      'Software Development',
      'Data Science & Analytics',
      'UI/UX Design',
      'Product Management',
      'Digital Marketing',
      'Business Analysis',
      'Consulting',
      'Finance',
      'Project Management',
      'Research & Development',
      'Human Resources',
      'Sales',
      'Operations',
      'Customer Success',
      'Content Creation',
    ];
    
    res.json(careerInterests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/career/path/:interest
// @desc    Get career path information for a specific interest
// @access  Public
router.get('/path/:interest', async (req, res) => {
  try {
    const interest = req.params.interest;
    
    // This would typically come from a database
    // For now we just return mock data for Software Development
    if (interest === 'Software Development') {
      res.json({
        interest: 'Software Development',
        description: 'Software development involves creating, designing, deploying and maintaining software applications.',
        entryRoles: ['Junior Developer', 'Software Engineer Intern', 'Graduate Developer'],
        midLevelRoles: ['Software Engineer', 'Full Stack Developer', 'DevOps Engineer'],
        seniorRoles: ['Senior Software Engineer', 'Technical Lead', 'Software Architect'],
        keySkills: ['Programming Languages', 'Data Structures & Algorithms', 'Version Control', 'Testing', 'Databases'],
        educationPaths: ['Computer Science Degree', 'Bootcamps', 'Self-Learning & Certifications'],
        averageSalaries: {
          entry: '$60,000 - $80,000',
          mid: '$80,000 - $120,000',
          senior: '$120,000 - $200,000+'
        },
        growthOutlook: 'Excellent growth opportunities with a projected 22% increase in jobs by 2030',
        resources: [
          { name: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/' },
          { name: 'LeetCode', url: 'https://leetcode.com/' },
          { name: 'GitHub Learning Lab', url: 'https://lab.github.com/' }
        ]
      });
    } else {
      res.status(404).json({ msg: 'Career path information not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/career/interests
// @desc    Update user career interests
// @access  Private
router.put('/interests', auth, async (req, res) => {
  try {
    const { interests } = req.body;
    
    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ msg: 'Please provide a valid array of interests' });
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    user.careerInterests = interests;
    await user.save();
    
    res.json(user.careerInterests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/career/recommendations
// @desc    Get career recommendations based on user profile
// @access  Private
router.get('/recommendations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // This would typically be a complex algorithm based on user skills, education, experience, etc.
    // For now, we return a simple mock response
    
    const recommendations = [
      {
        role: 'Software Developer',
        matchScore: 85,
        skillsMatched: ['JavaScript', 'React', 'Node.js'],
        skillsToAcquire: ['TypeScript', 'AWS'],
        suggestedCourses: [
          { name: 'Advanced React Patterns', provider: 'Frontend Masters' },
          { name: 'AWS Certified Developer', provider: 'AWS Training' }
        ]
      },
      {
        role: 'Data Analyst',
        matchScore: 70,
        skillsMatched: ['Python', 'SQL'],
        skillsToAcquire: ['Tableau', 'R', 'Statistics'],
        suggestedCourses: [
          { name: 'Data Visualization with Tableau', provider: 'Coursera' },
          { name: 'Statistics for Data Science', provider: 'edX' }
        ]
      }
    ];
    
    res.json(recommendations);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
