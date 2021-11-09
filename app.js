require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const _ = require('lodash');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const { stringify } = require('querystring');
const port = 3000;
let posts = [];
let myArray = Object.values(posts);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/blogDBpost", { useNewUrlParser: true });
// mongoose.set("useCreateIndex", true);
// mongoose.connect(process.env.MONGOOSE_CLUSTER, { useNewUrlParser: true, useUnifiedTopology: true });

// sign in schema ---------------------------------------------------------------------------------

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  name: String,
  photo: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

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
    // const guser = new User({
    //   googleId:profile.id,
    //   username: profile.name.givenName,
    //   photo: profile.photos.value,
     
    // });
  
    // guser.save();
    // console.log(profile);

console.log( Number(profile.id));
    User.findOrCreate({  googleId: profile.id, name: profile.displayName,username:profile.displayName, photo: profile._json.picture }, function (err, user) {
      return cb(err, user);
    });
  }
));
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
    User.find({ "secret": { $ne: null } }, function (err, foundUsers) {
      if (err) {
        console.log(err);
      } else {
        if (foundUsers) {
          res.render("secrets", {
            usersWithSecrets: foundUsers
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


//---------------------------------------------------------------------------------------------------------
const postSchema = {
  title: String,
  content: String,
  seen:String
};
const trendSchema = {
  title: String,
  content: String,
  seen:String
}
const Post = mongoose.model("Post", postSchema);
const Trend = mongoose.model("Trend",trendSchema);
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


// app.get("/", (req, res)=> {
//   User.find({}, function (err, user) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("home.ejs",{
//         posts:user
//       });
//     }
//   })
// });

app.get("/compose", (req, res) => {
  res.render('compose.ejs');
})

app.post('/compose', (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();
  res.redirect("/");

});

app.get('/posts/:userId', function (req, res) {
  let requestedTitle = _.lowerCase(req.params.userId);

  Post.find((err, posts) => {
    if (err) {
      console.log(err);
    } else {
      posts.forEach((i) => {
        const storedTitle = _.lowerCase(i.title);

        if (storedTitle === requestedTitle) {
          res.render('post.ejs', {
            title: i.title,
            content: i.content

          });
        }
      });
    }
  });
});

app.get("/chat", (req, res) => {

  User.find({}, function (err, users) {
    if(err){console.log(err);}else{
      
      res.render('chat.ejs', {
            users: users,
            userDP: "https://lh3.googleusercontent.com/a/AATXAJwtzq2EGAbTWB1lF_6zsXabeCdTs6fLkvapTmne=s96-c",
            
          });
        }
      })
     })


app.get("/profile", (req, res) => {
  res.render('profile.ejs');
})

app.listen(process.env.PORT || port, () => {
  console.log(`The application started successfully on port http://localhost:${port}`);
});

