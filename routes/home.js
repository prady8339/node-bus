
module.exports = function (app, Post, User) {

app.get("/", (req, res) => {

    Post.find({}, function (err, posts) {

      if (err) { console.log(err); }
      else {
        
        res.render('home.ejs', {
          posts: posts,
       
        });
      }

    })

  });


}