



module.exports = function (app, Post, User) {

  app.get("/", async (req, res) => {


    Post.find({}, (err, posts) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving posts");
        return;
      }

      // Update the score for each post
      posts.forEach(post => {
        const score = post.comments.length + (post.likes.length * 10) + post.dislikes.length + (post.shares.length * 20);
        post.score = score;
        post.save();
      });


    });
    res.render('firstpage.ejs');

  });

  app.get("/home", async (req, res) => {
    try {

      const posts = await Post.find({}).sort({ "score": -1 }).exec();
      const homeData = [];

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const userinfo = await User.findOne({ _id: post.UserId }).exec();
        const postWithUser = {
          post: post,
          userdata: userinfo
        };
        homeData.push(postWithUser);
      }
      // console.log(homeData[0].userdata.id);
      // console.log(posts[0].UserId);
      //console.log(homeData);
      if (req.isAuthenticated()) {
        const userdata = req.user.username;
        res.render('home.ejs', { username: userdata, homeData: homeData });
      } else {
        const userdata = undefined;
        res.render('home.ejs', { username: userdata, homeData: homeData });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });
};


