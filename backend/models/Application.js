
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  opportunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  resumeUrl: {
    type: String
  },
  coverLetter: {
    type: String
  },
  notes: {
    type: String
  },
  activities: [{
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  interviewDate: {
    type: Date
  },
  feedback: {
    type: String
  },
  skillMatch: {
    type: Number,
    default: 0
  },
  review: {
    strengths: [String],
    weaknesses: [String],
    overallAssessment: String,
    recommendationLevel: {
      type: String,
      enum: ['Highly Recommended', 'Recommended', 'Neutral', 'Not Recommended'],
      default: 'Neutral'
    },
    reviewDate: {
      type: Date,
      default: Date.now
    }
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
