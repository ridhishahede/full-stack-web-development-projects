const mongoose = require('mongoose');

const cleaningServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hostelName: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  }
});

const CleaningService = mongoose.model('CleaningService', cleaningServiceSchema);

module.exports = CleaningService;
