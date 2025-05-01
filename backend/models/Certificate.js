
const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date
  },
  credentialId: {
    type: String
  },
  credentialUrl: {
    type: String
  },
  certificateImage: {
    type: String
  },
  skills: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['In Progress', 'Completed'],
    default: 'Completed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
