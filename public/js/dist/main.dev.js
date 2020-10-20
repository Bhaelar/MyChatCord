"use strict";

var chatForm = document.getElementById('chat-form');
var chatMessages = document.querySelector('.chat-messages');
var roomName = document.getElementById('room-name');
var userList = document.getElementById('users'); //const roomList = document.getElementById('room');
// Get username and room from URL

var _Qs$parse = Qs.parse(location.search, {
  ignoreQueryPrefix: true
}),
    username = _Qs$parse.username,
    room = _Qs$parse.room; // Get rooms from database
// window.addEventListener('load', function() {
//	outputRooms();
// })


var socket = io(); // Join chatroom

socket.emit('joinRoom', {
  username: username,
  room: room
}); // Get room and users

socket.on('roomUsers', function (_ref) {
  var room = _ref.room,
      users = _ref.users;
  outputRoomName(room);
  outputUsers(users);
}); // Message from server

socket.on('message', function (message) {
  console.log(message);
  outputMessage(message); // Scroll down

  chatMessages.scrollTop = chatMessages.scrollHeight;
}); // Message submit

chatForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Get message text

  var msg = e.target.elements.msg.value; // Emit message to server

  socket.emit('chatMessage', msg); // cLEAR INPUt

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
}); //Output message to DOM

function outputMessage(message) {
  var div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = "<p class=\"meta\">".concat(message.username, " <span>").concat(message.time, "</span></p>\n\t\t\t\t\t\t<p class=\"text\">\n\t\t\t\t\t\t\t").concat(message.text, "\n                        </p>");
  document.querySelector('.chat-messages').appendChild(div);
} // Add room name to DOM


function outputRoomName(room) {
  roomName.innerText = room;
} // Add users to DOM


function outputUsers(users) {
  //users.forEach(user => console.log(user.username));
  userList.innerHTML = "\n        ".concat(users.map(function (user) {
    return "<li>".concat(user.username, "</li>");
  }).join(''), "\n    ");
} // Fetch rooms

/*
async function outputRooms() {
	let rooms = await Room.find();
	if (!rooms) {
		console.log('No rooms');
	}
	roomList.innerHTML = `
        ${rooms.map(room => `<option value="${room.name}">${room.name}</option>`).join('')}
    `;
} */