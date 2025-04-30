
const mongoose = require('mongoose');

const ATSParameterSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  requiredSkills: [{
    skill: String,
    weight: {
      type: Number,
      default: 1
    }
  }],
  requiredExperience: {
    type: Number,
    default: 0
  },
  requiredEducation: String,
  keywords: [{
    keyword: String,
    weight: {
      type: Number,
      default: 1
    }
  }],
  formatRequirements: {
    preferredLength: Number,
    requiresContactInfo: {
      type: Boolean,
      default: true
    },
    requiresEducation: {
      type: Boolean,
      default: true
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ATSParameter', ATSParameterSchema);
