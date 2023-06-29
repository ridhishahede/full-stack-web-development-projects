const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  complaintAbout: {
    type: String,
    required: true
  }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
