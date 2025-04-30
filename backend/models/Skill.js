
const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: String,
  description: String,
  level: {
    type: Number,
    min: 1,
    max: 5
  }
});

const UserSkillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  level: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  assessments: [{
    score: Number,
    date: {
      type: Date,
      default: Date.now
    },
    certificate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certificate'
    }
  }]
});

const Skill = mongoose.model('Skill', SkillSchema);
const UserSkill = mongoose.model('UserSkill', UserSkillSchema);

module.exports = { Skill, UserSkill };
