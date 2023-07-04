
module.exports = function (app, Post, User) {

  app.get("/", (req, res) => {

    Post.find({}, function (err, posts) {

      if (err) { console.log(err); }
      else {
        //console.log(req.username);
        res.render('home.ejs', {
          posts: posts,
          username: req.username
        });
      }

    })

  });

}