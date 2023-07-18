module.exports = function (app, Post, User) {
  app.get("/search", function (req, res) {
    if (!req.isAuthenticated())
      res.render("search", { username: undefined });
    else
      res.render("search", { username: req.user.username });
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

      await Promise.all(
        posts.map(async (post) => {
          const userinfo = await User.findOne({ _id: post.UserId }).exec();
          const postWithUser = {
            post: post,
            userdata: userinfo,
          };
          homeData.push(postWithUser);
        })
      );
      const username = req.isAuthenticated() ? req.user.username : undefined;
      res.render("home.ejs", { homeData: homeData, username: username });
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  });

  // app.post('/search/suggestions', async function (req, res) {
  //   try {
  //     console.log(req.body);
  //     const searchQuery = req.body.search;
  //     const regexQuery = new RegExp(searchQuery, 'i');

  //     const suggestions = await Post.find(
  //       { title: regexQuery },
  //       'title'
  //     )
  //       .limit(5)
  //       .exec();

  //     const suggestionTitles = suggestions.map(suggestion => suggestion.title);
  //     res.json(suggestionTitles);
  //   } catch (err) {
  //     console.error(err);
  //     res.sendStatus(500);
  //   }
  // });
};
