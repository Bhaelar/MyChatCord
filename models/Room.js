const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
            user: {
                type: Schema.Types.ObjectId
            },
            username: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('room', RoomSchema);