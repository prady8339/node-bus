
module.exports = function (app, Post, User) {

  app.get("/", (req, res) => {

    res.render('firstpage.ejs');

  });

  app.get("/home", (req, res) => {

    Post.find({})
      .sort({ "score": -1 })
      .exec(function (err, posts) {

        if (err) { console.log(err); }
        else {
          //console.log(req.username);
          let userdata;
          User.find({ username: req.username }, function (err, userinfo) {
            if (err) { console.log(err); }
            else {
              userdata = userinfo;
            }
          });

          res.render('home.ejs', {
            posts: posts,
            userdata: userdata
          });
        }

      })

  });

}