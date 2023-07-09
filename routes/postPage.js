const _ = require('lodash');

module.exports = function (app, Post, User) {

  app.get('/posts/:userId', function (req, res) {
    //let requestedTitle = _.lowerCase(req.params.userId);
    let requestedId = req.params.userId;
    Post.find((err, posts) => {
      if (err) {
        console.log(err);
      } else {
        posts.forEach((i) => {
          const storedId = i.id;

          if (storedId === requestedId) {
            res.render('post.ejs', {
              id: i._id,
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