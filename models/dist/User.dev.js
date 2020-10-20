"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('user', UserSchema);