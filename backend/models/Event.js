
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: String,
  type: {
    type: String,
    enum: ['Interview', 'Deadline', 'Event', 'Meeting', 'Other'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: String,
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    enum: ['Application', 'Opportunity']
  },
  location: String,
  isCompleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Event', EventSchema);
