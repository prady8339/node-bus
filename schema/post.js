

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    seen:String,
    date:String,
    time:String,
    UserId:String,
    username:String,
    photo:String
  });



module.exports = new mongoose.model('Post', postSchema);
