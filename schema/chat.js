const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    roomname: String,
    users: [mongoose.Schema.Types.ObjectId],
    username: String,
    chats: [
        {
            _id: false,
            username: String,
            content: String,
            __v: Number
        }
    ],
    content: String,
    __v: Number
});

module.exports = mongoose.model('Chat', chatSchema);