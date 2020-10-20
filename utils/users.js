const User = require('../models/User');
const Room = require('../models/Room');
// const users = [];

// Join user to chat
async function userJoin (id, username, room) {
	let user = await User.findOne({ username });
	let rooms = await Room.findOne({ name: room });

	if (user) {
		return res.status(400).json({ errors: [ { msg: 'Username already taken' } ] });
	}

	user = new User({ username, userId: id, room });

	await user.save();

	if (!rooms) {
		rooms = new Room({ name: room });
		await rooms.save();
		const newActiveUser = {
			user: user.id,
			username: user.username
		};

		rooms.users.unshift(newActiveUser);

		await rooms.save();
	}

	if (rooms) {
		const newActiveUser = {
			user: user.id,
			username: user.username
		};

		rooms.users.unshift(newActiveUser);

		await rooms.save();
	}

	return user;

	/* const user = { id, username, room };

    users.push(user);

    return user; */
}

// Get current user
async function getCurrentUser (id) {
	let user = await User.findOne({ userId: id });
	return user;
}

// User leaves chat
async function userLeave (id) {
	let removedUser = await User.findOne({ userId: id });
	let rooms = await Room.findOne({ name: removedUser.room });

	await User.findOneAndRemove({ userId: id });

	rooms.users = rooms.users.filter(({ username }) => username !== removedUser.username);

	await rooms.save();

	return removedUser;
}

// Get room users
async function getRoomUsers (room) {
	let rooms = await User.find({ room: room });
	if (!rooms) {
		return '';
	}
	return rooms;
}

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers };
