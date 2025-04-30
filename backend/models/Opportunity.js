
const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  location: String,
  type: {
    type: String,
    enum: ['Internship', 'Research', 'Volunteer', 'Part-time', 'Full-time'],
    required: true
  },
  duration: String,
  stipend: {
    amount: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  deadline: Date,
  skillsRequired: [String],
  tags: [String],
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
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

module.exports = mongoose.model('Opportunity', OpportunitySchema);
