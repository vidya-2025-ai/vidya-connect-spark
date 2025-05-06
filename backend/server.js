
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const opportunityRoutes = require('./routes/opportunities');
const certificateRoutes = require('./routes/certificates');
const mentorshipRoutes = require('./routes/mentorship');
const skillRoutes = require('./routes/skills');
const calendarRoutes = require('./routes/calendar');
const resumeRoutes = require('./routes/resume');
const atsRoutes = require('./routes/ats');
const communityRoutes = require('./routes/community');
const grievanceRoutes = require('./routes/grievances');
const challengeRoutes = require('./routes/challenges');
const microInternshipRoutes = require('./routes/micro-internships');
const dashboardRoutes = require('./routes/dashboard');
const careerRoutes = require('./routes/career');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/micro-internships', microInternshipRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/career', careerRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('InternMatch API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
