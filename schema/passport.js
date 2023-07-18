

const mongoose = require('mongoose');
const express = require("express");
const session = require('express-session');

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

// const userSchema = require('./userSchema');

module.exports = function (app, User, passport, hostname, port) {



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
    callbackURL: `http://${hostname}:${port}/auth/google/secrets`,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
    function (accessToken, refreshToken, profile, cb) {
      const defaultUsername = profile._json.email.split("@")[0];
      User.findOrCreate({ email: profile._json.email, username: defaultUsername, photo: profile._json.picture, name: profile.displayName, googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));
  app.post("/login", function (req, res) {
    const usernameOrEmail = req.body.username;

    const findUser = () => {
      return new Promise((resolve, reject) => {
        let query;
        if (isValidEmail(usernameOrEmail)) {
          query = { email: usernameOrEmail };
        } else {
          query = { username: usernameOrEmail };
        }

        User.findOne(query, function (err, userFind) {
          if (err) {
            reject(err);
          } else {
            resolve(userFind);
          }
        });
      });
    };

    findUser()
      .then((userFind) => {
        if (userFind) {
          const loginUser = userFind.username;
          //  console.log(loginUser);

          const user = new User({
            username: loginUser,
            password: req.body.password
          });
          //console.log(user);

          req.login(user, function (err) {
            if (err) {
              console.log(err);
            } else {
              passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
              });
            }
          });
        } else {
          console.log("Invalid username/email or password.");
          // Handle the error or redirect to an appropriate page
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function isValidEmail(email) {
    // You can implement a regular expression or a library to validate the email format
    // For simplicity, let's assume any string containing "@" is a valid email
    return email.includes("@");
  }



  //   app.post("/login", function (req, res) {

  //     const usernameOrEmail = req.body.username;

  //     const findUser = () => {
  //       return new Promise((resolve, reject) => {
  //         User.findOne({
  //           $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
  //         }, function (err, userFind) {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(userFind);
  //           }
  //         });
  //       });
  //     };

  //     findUser()
  //       .then((userFind) => {
  //         if (userFind) {
  //           const loginUser = userFind.username;
  //           console.log(loginUser);
  //           const user = new User({
  //             username: loginUser,
  //             password: req.body.password
  //           });
  //           console.log(user);
  //           // req.login(newUser, function (err) {
  //           //   if (err) {
  //           //     console.log(err);
  //           //   } else {
  //           //     passport.authenticate("local")(req, res, function () {
  //           //       res.redirect("/secrets");
  //           //     });
  //           //   }
  //           // });
  //           req.login(user, function (err) {
  //             if (err) {
  //               console.log(err);
  //             } else {
  //               passport.authenticate("local")(req, res, function () {
  //                 res.redirect("/secrets");
  //               });
  //             }
  //           });
  //         } else {
  //           console.log("Invalid username/email or password.");
  //           // Handle the error or redirect to an appropriate page
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });


  //     // try {
  //     //   const user = await User.findOne({
  //     //     $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
  //     //   }).exec();

  //     //   if (user) {
  //     //     const loginUser = user.username;

  //     //     const newUser = new User({
  //     //       username: loginUser,
  //     //       password: req.body.password
  //     //     });

  //     //     req.login(newUser, function (err) {
  //     //       if (err) {
  //     //         console.log(err);
  //     //       } else {
  //     //         passport.authenticate("local")(req, res, function () {
  //     //           res.redirect("/secrets");
  //     //         });
  //     //       }
  //     //     });
  //     //   } else {
  //     //     console.log("Invalid username/email or password.");
  //     //     // Handle the error or redirect to an appropriate page
  //     //   }
  //     // } catch (err) {
  //     //   console.log(err);
  //     // }

  //     // const usernameOrEmail = req.body.username;
  //     // let loginUser;
  //     // User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }, function (err, user) {
  //     //   if (err) {
  //     //     console.log(err);
  //     //   } else {
  //     //     );
  //     //     loginUser = user.username
  //     //   }
  //     // });

  //     // console.log(loginUser);

  //     // const user = new User({
  //     //   username: loginUser,
  //     //   password: req.body.password
  //     // });
  //     // console.log(user);

  //     // req.login(user, function (err) {
  //     //   if (err) {
  //     //     console.log(err);
  //     //   } else {
  //     //     passport.authenticate("local")(req, res, function () {
  //     //       res.redirect("/secrets");
  //     //     });
  //     //   }
  //     // });

  //   });


}







