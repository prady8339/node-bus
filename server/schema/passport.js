

const mongoose = require('mongoose');
const express = require("express");
const session = require('express-session');

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

// const userSchema = require('./userSchema');

module.exports = function(app,User,passport){
    
    
   
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// createStrategy() Creates a configured passport-local LocalStrategy instance that can be used in passport.

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
    
    
    
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({  googleId: profile.id, name: profile.displayName,username:profile.displayName, photo: profile._json.picture }, function (err, user) {
        return cb(err, user);
      });
    }
  ));

  app.post("/login", function (req, res) {

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    });
  
  });
  
  

}


    

    



