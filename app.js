require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const fs = require('fs');
const connection = require('./db');
// const session = require('express-session');
const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');
// const { stringify } = require('querystring');


const port = 3000;
let posts = [];
let myArray = Object.values(posts);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


connection();
// sign in schema ---------------------------------------------------------------------------------

const User = require('./schema/userSchema');
const passportme = require('./schema/passport');

passportme(app,User,passport);

//chat get route

 const chat = require('./getroutes/chat')(app,User);


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

const Post = require('./schema/post');
const Trend = require('./schema/trend');

app.get("/", (req, res) => {
  
    Post.find({}, function (err, posts) {
      if(err){console.log(err);}else{
        Trend.find({},function(err,trends){
          if(err){console.log(err);}else{
            res.render('home.ejs', {
             posts: posts,
              userDP: "https://lh3.googleusercontent.com/a/AATXAJwtzq2EGAbTWB1lF_6zsXabeCdTs6fLkvapTmne=s96-c",
              trends:trends
            });
          }
        })
       }
    })
  
});

app.get("/compose", (req, res) => {
  res.render('compose.ejs');
})

app.post('/compose', (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    UserId:req.user.id
  });

  post.save();
  res.redirect("/");

});


const postPage = require('./getroutes/postPage')(app);

const multer = require('multer');
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });

const imgModel = require('./schema/model');


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
  
  
  
const settings = require('./getroutes/settings')(app,imgModel);

  
app.post('/settings', upload.single('image'), (req, res, next) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        UserId:req.user.id
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/settings');
        }
    });
});

app.listen(process.env.PORT || port, () => {
  console.log(`The application started successfully on port http://localhost:${port}`);
});

