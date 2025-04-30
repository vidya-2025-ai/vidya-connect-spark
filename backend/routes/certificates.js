
const express = require('express');
const auth = require('../middleware/auth');
const Certificate = require('../models/Certificate');
const router = express.Router();

// Get all certificates for a student
router.get('/', auth, async (req, res) => {
  try {
    // Ensure user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const certificates = await Certificate.find({ student: req.user.id })
      .sort({ issueDate: -1 });
      
    res.json(certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new certificate
router.post('/', auth, async (req, res) => {
  try {
    const { title, issuer, issueDate, expiryDate, credentialId, credentialUrl, certificateImage, skills, status } = req.body;
    
    const certificate = new Certificate({
      title,
      issuer,
      student: req.user.id,
      issueDate,
      expiryDate,
      credentialId,
      credentialUrl,
      certificateImage,
      skills,
      status
    });
    
    await certificate.save();
    
    res.status(201).json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get certificate by id
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const certificate = await Certificate.findById(id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Ensure user owns this certificate
    if (certificate.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    res.json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update certificate
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const certificate = await Certificate.findById(id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Ensure user owns this certificate
    if (certificate.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { title, issuer, issueDate, expiryDate, credentialId, credentialUrl, certificateImage, skills, status } = req.body;
    
    // Update fields if provided
    if (title) certificate.title = title;
    if (issuer) certificate.issuer = issuer;
    if (issueDate) certificate.issueDate = issueDate;
    if (expiryDate) certificate.expiryDate = expiryDate;
    if (credentialId) certificate.credentialId = credentialId;
    if (credentialUrl) certificate.credentialUrl = credentialUrl;
    if (certificateImage) certificate.certificateImage = certificateImage;
    if (skills) certificate.skills = skills;
    if (status) certificate.status = status;
    
    await certificate.save();
    
    res.json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
