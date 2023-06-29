const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;

