

module.exports = function(app,Post){

    app.get("/secrets", function (req, res) {
        if (req.isAuthenticated()) {
          Post.find({ "UserId": { $eq: req.user.id } }, function (err, foundUsers) {
            if (err) {
              console.log(err);
            } else {
              if (foundUsers) {
                res.render("secrets", {
                  usersWithSecrets: foundUsers,
                  username:req.user.username
                });
              }
            }
          });
        }
        else {
          res.redirect("/login")
        }
      });
      
         
    }