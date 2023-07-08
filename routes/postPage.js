const _ = require('lodash');
const Post = require('../schema/post');
module.exports = function (app) {

  app.get('/posts/:userId', function (req, res) {
    let requestedTitle = _.lowerCase(req.params.userId);

    Post.find((err, posts) => {
      if (err) {
        console.log(err);
      } else {
        posts.forEach((i) => {
          const storedTitle = _.lowerCase(i.title);

          if (storedTitle === requestedTitle) {
            res.render('post.ejs', {
              title: i.title,
              content: i.content,
              imgurl: i.titleimg,
              username: req.username,
              likes: i.likes.length,
              dislikes: i.dislikes.length,
              shares: i.shares.length,
              comments: i.comments,
            });
          }
        });
      }
    });
  });

  app.post('/addLike', function (req, res) {
    console.log("hi");
    console.log(req.body);
  });

}