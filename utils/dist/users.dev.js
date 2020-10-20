"use strict";

var User = require('../models/User');

var Room = require('../models/Room'); // const users = [];
// Join user to chat


function userJoin(id, username, room) {
  var user, rooms, newActiveUser, _newActiveUser;

  return regeneratorRuntime.async(function userJoin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 2:
          user = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Room.findOne({
            name: room
          }));

        case 5:
          rooms = _context.sent;

          if (!user) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: [{
              msg: 'Username already taken'
            }]
          }));

        case 8:
          user = new User({
            username: username,
            userId: id,
            room: room
          });
          _context.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          if (rooms) {
            _context.next = 19;
            break;
          }

          rooms = new Room({
            name: room
          });
          _context.next = 15;
          return regeneratorRuntime.awrap(rooms.save());

        case 15:
          newActiveUser = {
            user: user.id,
            username: user.username
          };
          rooms.users.unshift(newActiveUser);
          _context.next = 19;
          return regeneratorRuntime.awrap(rooms.save());

        case 19:
          if (!rooms) {
            _context.next = 24;
            break;
          }

          _newActiveUser = {
            user: user.id,
            username: user.username
          };
          rooms.users.unshift(_newActiveUser);
          _context.next = 24;
          return regeneratorRuntime.awrap(rooms.save());

        case 24:
          return _context.abrupt("return", user);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
} // Get current user


function getCurrentUser(id) {
  var user;
  return regeneratorRuntime.async(function getCurrentUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            userId: id
          }));

        case 2:
          user = _context2.sent;
          return _context2.abrupt("return", user);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
} // User leaves chat


function userLeave(id) {
  var removedUser, rooms;
  return regeneratorRuntime.async(function userLeave$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            userId: id
          }));

        case 2:
          removedUser = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Room.findOne({
            name: removedUser.room
          }));

        case 5:
          rooms = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(User.findOneAndRemove({
            userId: id
          }));

        case 8:
          rooms.users = rooms.users.filter(function (_ref) {
            var username = _ref.username;
            return username !== removedUser.username;
          });
          _context3.next = 11;
          return regeneratorRuntime.awrap(rooms.save());

        case 11:
          return _context3.abrupt("return", removedUser);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
} // Get room users


function getRoomUsers(room) {
  var rooms;
  return regeneratorRuntime.async(function getRoomUsers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.find({
            room: room
          }));

        case 2:
          rooms = _context4.sent;

          if (rooms) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", '');

        case 5:
          return _context4.abrupt("return", rooms);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  userJoin: userJoin,
  getCurrentUser: getCurrentUser,
  userLeave: userLeave,
  getRoomUsers: getRoomUsers
};