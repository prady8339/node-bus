

const mongoose = require('mongoose');

const chatSchema= new mongoose.Schema({
	username:String,
    content:String
	
});

module.exports = new mongoose.model('Chat', chatSchema);
