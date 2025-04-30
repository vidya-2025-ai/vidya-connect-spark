
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
  expiryDate: Date,
  credentialId: String,
  credentialUrl: String,
  certificateImage: String,
  skills: [String],
  status: {
    type: String,
    enum: ['In Progress', 'Completed'],
    default: 'Completed'
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
