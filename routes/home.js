
module.exports = function (app, Post, User) {

  app.get("/", (req, res) => {

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
      res.render('home.ejs', { homeData: homeData });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });
};


