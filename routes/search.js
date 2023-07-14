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

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const userinfo = await User.findOne({ _id: post.UserId }).exec();
        const postWithUser = {
          post: post,
          userdata: userinfo,
        };
        homeData.push(postWithUser);
      }

      res.render("home.ejs", { homeData: homeData, username: req.user.username });
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  });

  app.post('/search/suggestions', async function (req, res) {
    try {
      console.log(req.body);
      const searchQuery = req.body.search;
      // console.log(searchQuery);
      const regexQuery = new RegExp(searchQuery, 'i');

      // Query the database for search suggestions
      const suggestions = await Post.find(
        { title: regexQuery }, // Filter suggestions based on the title field
        'title' // Only select the title field for suggestions
      )
        .limit(5) // Limit the number of suggestions to fetch
        .exec();

      const suggestionTitles = suggestions.map(suggestion => suggestion.title);
      res.json(suggestionTitles);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });


};
