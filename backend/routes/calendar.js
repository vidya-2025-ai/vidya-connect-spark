
const express = require('express');
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const router = express.Router();

// Get all events for a user
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id })
      .sort({ date: 1 });
      
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new event
router.post('/', auth, async (req, res) => {
  try {
    const { title, date, time, type, description, relatedTo, onModel, location } = req.body;
    
    const event = new Event({
      title,
      date,
      time,
      type,
      user: req.user.id,
      description,
      relatedTo,
      onModel,
      location
    });
    
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Ensure user owns this event
    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { title, date, time, type, description, location, isCompleted } = req.body;
    
    // Update fields if provided
    if (title) event.title = title;
    if (date) event.date = date;
    if (time) event.time = time;
    if (type) event.type = type;
    if (description) event.description = description;
    if (location) event.location = location;
    if (isCompleted !== undefined) event.isCompleted = isCompleted;
    
    await event.save();
    
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Ensure user owns this event
    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    await event.remove();
    
    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
