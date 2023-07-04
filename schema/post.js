const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 6
  },
  content: {
    type: String,
    required: true,
    minlength: 20
  },
  UserId: String,
  username: String,
  titleimg: String,
  comments: [{
    UserId: String,
    username: String,
    userComment: String,
    $timeStamp: Date,
    followUp: [{
      UserId: String,
      username: String,
      userComment: String,
      $timeStamp: Date
    }]
  }],
  likes: [{
    UserId: String,
    username: String,
    $timeStamp: Date
  }],
  dislikes: [{
    UserId: String,
    username: String,
    $timeStamp: Date
  }],
  shares: [{
    UserId: String,
    username: String,
    $timeStamp: Date
  }],
  createat: {
    type: Date,
    default: Date.now
  }
});




module.exports = new mongoose.model('Post', postSchema);


// {
//   "_id": {
//     "$oid": "646867ea5d9928412b48c9ff"
//   },
//   "title": "f asdCVXZasdfvasdfas asdfas dfasdf asdf ",
//     "content": "asd dfgsasdf asdf asdf asd asdasdv asd asddf asdfffa sdff ",
//       "UserId": "646867905d9928412b48c9df",
//         "username": "pradyumna singh",
//           "titleimg": "https://res.cloudinary.com/ar7/image/upload/v1684563946/kc8qzugglewmfveywvt9.png",
//             "comments": [
//               {
//                 "UserId": "646867905d9928412b48c9df",
//                 "username": "pradyumna singh",
//                 "userComment": "Really nice post",
//                 "$timeStamp": "2023-05-20T06:25:46.359Z",
//                 "followUp": [
//                   {
//                     "UserId": "6276a9a1d66b425609dda673",
//                     "username": "yuri blue",
//                     "userComment": "yeah",
//                     "$timeStamp": "2023-05-20T06:25:46.359Z"
//                   }
//                 ]
//               },
//               {
//                 "UserId": "6276a9a1d66b425609dda673",
//                 "username": "yuri blue",
//                 "userComment": "Awersome post",
//                 "$timeStamp": "2023-05-20T06:25:46.359Z",
//                 "followUp": []
//               }
//             ],
//               "likes": [
//                 {
//                   "UserId": "646867905d9928412b48c9df",
//                   "username": "pradyumna singh",
//                   "$timeStamp": "2023-05-20T06:25:46.359Z"
//                 }
//               ],
//                 "dislikes": [
//                   {
//                     "UserId": "646867905d9928412b48c9df",
//                     "username": "pradyumna singh",
//                     "$timeStamp": "2023-05-20T06:25:46.359Z"
//                   }
//                 ],
//                   "shares": [
//                     {
//                       "UserId": "646867905d9928412b48c9df",
//                       "username": "pradyumna singh",
//                       "$timeStamp": "2023-05-20T06:25:46.359Z"
//                     }
//                   ],
//                     "createat": {
//     "$date": "2023-05-20T06:25:46.359Z"
//   },
//   "__v": 0
// }