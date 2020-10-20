const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect Database
connectDB();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Admin';

// Run when client connects
io.on('connection', (socket) => {
	socket.on('joinRoom', async ({ username, room }) => {
		const user = await userJoin(socket.id, username, room);
		socket.join(user.room);
		// Welcome current user
		socket.emit('message', formatMessage(botName, 'Welcome to Chatcord!'));

		// Broadcast when a user connects
		socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

		// Send users and room info
		io.to(room).emit('roomUsers', {
			room: room,
			users: await getRoomUsers(room)
		});
	});

	// Runs when client disconnects
	socket.on('disconnect', async () => {
		const user = await userLeave(socket.id);
		if (user) {
			io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

			// Send users and room info
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: await getRoomUsers(user.room)
			});
		}
	});

	// Listen for chatMessage
	socket.on('chatMessage', async (msg) => {
		const user = await getCurrentUser(socket.id);

		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
