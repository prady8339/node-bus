

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    seen:String,
    UserId:String
  });



module.exports = new mongoose.model('Post', postSchema);
