// menu.js

const mongoose = require('mongoose');

const messMenuSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  breakfastMenu: {
    type: String,
    required: true
  },
  lunchMenu: {
    type: String,
    required: true
  },
  snacksMenu :{
    type: String,
    required : true
  },
  dinnerMenu: {
    type: String,
    required: true
  }
});

const MessMenu = mongoose.model('MessMenu', messMenuSchema);

module.exports = MessMenu;
