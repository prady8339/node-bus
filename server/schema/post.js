const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
      type :String,
      unique:true,
      require : true,
      minlength : 6
    },
    content: {
      type :String,
      require : true,
      minlength : 20
    },
    seen:String,
    UserId: String,
    username:String,
    createat :{
      type: Date,
      default: () => new Date()
    } ,

    titleimg:String
  });



module.exports = new mongoose.model('Post', postSchema);
