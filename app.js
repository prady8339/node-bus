require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const metaphone = require('metaphone');
const path = require("path");
const ejs = require("ejs");
const _ = require('lodash');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const { stringify } = require('querystring');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const port = 3000;


const app = express();
app.engine('handlebars', exphbs(
  {
    extname: "handlebars",
    //defaultLayout: "main-layout",
    layoutsDir: "views/"
  }
));
app.set('view engine', 'handlebars');
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

// mongoose.connect("mongodb://localhost:27017/blogDBpost", { useNewUrlParser: true });
// mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGOOSE_CLUSTER, { useNewUrlParser: true, useUnifiedTopology: true });

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
          res.render("main.handlebars", {
            usersWithSecrets: foundUsers,
            layout: false 
          });
        }
      }
    });
  }
  else {
    res.redirect("/login")
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
  
  res.redirect("/login");
 
  
});




// project manager integration-->

app.get('/response', (req, res) => {
  res.render('response.handlebars', { layout: false });
});

app.post('/send', (req, res) => {
  const output = `
                  <p>You have a new contact request</p>
                  <h3>Contact Details</h3>
                  <ul>  
                    <li>Name: ${req.body.name}</li>
                    <li>Email: ${req.body.email}</li>
                    <li>Project: ${req.body.project}</li>
                    <li>Coordinator: ${req.body.coordinator}</li>
                  </ul>
                  <h3>Message</h3>
                  <p>${req.body.message}</p>
                `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_ID,
      pass: process.env.USER_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '<martinarawal@gmail.com>', // sender address
    to: 'adityarana95488459@gmail.com',// list of receivers
    subject: 'New Project Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.redirect('/response');
  });
});
// ----- end;
app.listen(process.env.PORT || port, () => {
  console.log(`The application started successfully on port http://localhost:${port}`);
});

