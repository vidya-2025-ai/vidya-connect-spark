
const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  attachments: [{
    type: String
  }],
  score: {
    type: Number
  },
  feedback: {
    type: String
  },
  status: {
    type: String,
    enum: ['submitted', 'evaluated'],
    default: 'submitted'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const ChallengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organizationName: {
    type: String,
    required: true
  },
  skillsRequired: [{
    type: String
  }],
  deadline: {
    type: Date,
    required: true
  },
  solutions: [SolutionSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  Challenge: mongoose.model('Challenge', ChallengeSchema),
  Solution: mongoose.model('Solution', SolutionSchema)
};
