"use strict";

var express = require('express');

var http = require('http');

var path = require('path');

var socketio = require('socket.io');

var formatMessage = require('./utils/messages');

var _require = require('./utils/users'),
    userJoin = _require.userJoin,
    getCurrentUser = _require.getCurrentUser,
    userLeave = _require.userLeave,
    getRoomUsers = _require.getRoomUsers;

var connectDB = require('./config/db');

var app = express();
var server = http.createServer(app);
var io = socketio(server); // Connect Database

connectDB(); // Set static folder

app.use(express["static"](path.join(__dirname, 'public')));
var botName = 'Admin'; // Run when client connects

io.on('connection', function (socket) {
  socket.on('joinRoom', function _callee(_ref) {
    var username, room, user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _ref.username, room = _ref.room;
            _context.next = 3;
            return regeneratorRuntime.awrap(userJoin(socket.id, username, room));

          case 3:
            user = _context.sent;
            socket.join(user.room); // Welcome current user

            socket.emit('message', formatMessage(botName, 'Welcome to Chatcord!')); // Broadcast when a user connects

            socket.broadcast.to(user.room).emit('message', formatMessage(botName, "".concat(user.username, " has joined the chat"))); // Send users and room info

            _context.t0 = io.to(room);
            _context.t1 = room;
            _context.next = 11;
            return regeneratorRuntime.awrap(getRoomUsers(room));

          case 11:
            _context.t2 = _context.sent;
            _context.t3 = {
              room: _context.t1,
              users: _context.t2
            };

            _context.t0.emit.call(_context.t0, 'roomUsers', _context.t3);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  }); // Runs when client disconnects

  socket.on('disconnect', function _callee2() {
    var user;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(userLeave(socket.id));

          case 2:
            user = _context2.sent;

            if (!user) {
              _context2.next = 12;
              break;
            }

            io.to(user.room).emit('message', formatMessage(botName, "".concat(user.username, " has left the chat"))); // Send users and room info

            _context2.t0 = io.to(user.room);
            _context2.t1 = user.room;
            _context2.next = 9;
            return regeneratorRuntime.awrap(getRoomUsers(user.room));

          case 9:
            _context2.t2 = _context2.sent;
            _context2.t3 = {
              room: _context2.t1,
              users: _context2.t2
            };

            _context2.t0.emit.call(_context2.t0, 'roomUsers', _context2.t3);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    });
  }); // Listen for chatMessage

  socket.on('chatMessage', function _callee3(msg) {
    var user;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(getCurrentUser(socket.id));

          case 2:
            user = _context3.sent;
            io.to(user.room).emit('message', formatMessage(user.username, msg));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});
var PORT = 3000 || process.env.PORT;
server.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});