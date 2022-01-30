
module.exports = function(app,imgModel){

    app.get("/profile", (req, res) => {
        if (req.isAuthenticated()) {
        imgModel.find({ "UserId": { $eq: req.user.id } }, function (err, userImg) {
            if (err) {
              console.log(err);
            } else {
              if (userImg) {
                res.render("profile", {
                  items: userImg,
                  username:req.user.username
                });
              }
            }
          });
        }  else {
            res.redirect("/login")
          }
        })
        
        
         
    }