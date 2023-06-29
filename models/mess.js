// mess.js

const mongoose = require('mongoose');

// Define the Mess schema
const messSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  }
});

// Create the Mess model
const Mess = mongoose.model('Mess', messSchema);

module.exports = Mess;

