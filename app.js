require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const fs = require('fs');
const connection = require('./db');
const passport = require("passport");
 
const port = 3000;
let posts = [];
let myArray = Object.values(posts);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


connection();
// sign in schema ---------------------------------------------------------------------------------

const User = require('./schema/user');
const passportme = require('./schema/passport');

passportme(app,User,passport);

//chat get route

 const chat = require('./routes/chat')(app,User);


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
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});
const Post = require('./schema/post');
const Trend = require('./schema/trend');
const secrets = require('./routes/secrets')(app,Post);


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


app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
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


//---------------------------------------------------------------------------------------------------------

const home = require('./routes/home')(app,Post,Trend);

const compose = require('./routes/compose')(app,Post);

const postPage = require('./routes/postPage')(app);


const imgModel = require('./schema/image');

const profile = require('./routes/profile')(app,imgModel);
    
  
const settings = require('./routes/settings')(app,imgModel,__dirname);

  

app.listen(process.env.PORT || port, () => {
  console.log(`The application started successfully on port http://localhost:${port}`);
});

