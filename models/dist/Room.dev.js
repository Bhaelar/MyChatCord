"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [{
    user: {
      type: Schema.Types.ObjectId
    },
    username: {
      type: String
    }
  }]
});
module.exports = mongoose.model('room', RoomSchema);