
module.exports = function (app, Post) {

  app.get("/search", function (req, res) {
    res.render("search", { username: req.username });
  });

  app.post("/search", function (req, res) {
    // res.redirect('/');

    const searchQuery = req.body.search;


  });


}