
module.exports = function(app,User,passport){

    app.get("/register", function (req, res) {
        res.render("register");
      });
      
      app.post("/register", function (req, res) {
      
        User.register({ username: req.body.username }, req.body.password, function (err, user) {
          if (err) {
            console.log(err);
            res.redirect("/register");
          } else {
            passport.authenticate("local")(req, res, function () {
              res.redirect("/secrets");
            });
          }
        });
      
      });
      
             
        }