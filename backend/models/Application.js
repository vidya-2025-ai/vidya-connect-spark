
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
    enum: ['Pending', 'Under Review', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  resumeUrl: String,
  coverLetter: String,
  notes: String,
  activities: [{
    type: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    description: String
  }]
});

module.exports = mongoose.model('Application', ApplicationSchema);
