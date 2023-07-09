module.exports = function (app, Post, User) {
  app.get("/search", function (req, res) {
    res.render("search", { username: req.username });
  });

  app.post("/search", async function (req, res) {
    try {
      const searchQuery = req.body.search;
      const regexQuery = new RegExp(searchQuery, "i");

      const posts = await Post.find({
        $or: [
          { username: regexQuery },
          { content: regexQuery },
          { title: regexQuery },
        ],
      }).exec();

      const homeData = [];

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const userinfo = await User.findOne({ _id: post.UserId }).exec();
        const postWithUser = {
          post: post,
          userdata: userinfo,
        };
        homeData.push(postWithUser);
      }

      res.render("home.ejs", { homeData: homeData });
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  });
};
