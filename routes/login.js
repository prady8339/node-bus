
module.exports = function(app,passport){

    app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });

app.get("/login", function (req, res) {
  res.render("login",{
username:req.username
  });
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  

             
        }