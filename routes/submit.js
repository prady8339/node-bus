
module.exports = function(app,User){

   
app.get("/submit", function (req, res) {
    if (req.isAuthenticated()) {
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  });
  
  app.post("/submit", function (req, res) {
    const submittedSecret = req.body.secret;
  
    //Once the user is authenticated and their session gets saved, their user details are saved to req.user.
    // console.log(req.user.id);
  
    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.secret = submittedSecret;
          foundUser.save(function () {
            res.redirect("/secrets");
          });
        }
      }
    });
  });
        
         
}