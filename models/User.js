const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Provider or Consumer
  type: {
    type: String,
    default: 'consumer'
  },
  group: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  services: {
    type: Array
  },
  schedules: {
    type: Array
  }
});

module.exports = User = mongoose.model('user', UserSchema);
