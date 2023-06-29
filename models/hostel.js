const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  hostelName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  totalRooms: {
    type: Number,
    required: true
  },
  occupiedRooms: {
    type: Number,
    required: true
  },
  availableRooms: {
    type: Number,
    required: true
  }
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
