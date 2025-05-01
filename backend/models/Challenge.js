
const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  feedback: {
    type: String,
    required: true
  },
  evaluatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  evaluatedAt: {
    type: Date,
    default: Date.now
  }
});

const SolutionSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
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
  attachments: [String],
  evaluation: EvaluationSchema,
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
  solutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);
const Solution = mongoose.model('Solution', SolutionSchema);

module.exports = { Challenge, Solution };
