

const mongoose = require('mongoose');

const trendSchema= new mongoose.Schema({
    title: String,
    content: String,
    seen:String,
    UserId:String
  });

  
module.exports = new mongoose.model('Trend',trendSchema);
