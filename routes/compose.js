const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const cheerio = require('cheerio');

module.exports = function (app, Post, User) {

  function extractTextFromHTML(htmlString) {
    const $ = cheerio.load(htmlString);
    return $('body').text();
  }

  app.get("/compose", (req, res) => {
    if (req.isAuthenticated()) {
      res.render('compose.ejs', { username: req.user.username });
    } else {
      res.redirect("/login")
    }
  })



  app.post('/compose', upload.single('image'), (req, res) => {


    User.find({ "_id": { $eq: req.user.id } }, function (err, foundUsers) {
      if (err) {
        console.log(err);
      } else {

        const today = new Date();

        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];

        const sufix = ["st", "nd", "rd", "th"];
        let mysufix = "";
        if (today.getDate() % 10 - 1 < 4)
          mysufix = [(today.getDate() % 10 - 1)];
        else
          mysufix = "th";

        const date = today.getDate() + mysufix + ' ' + (monthNames[today.getMonth()]) + ' ' + today.getFullYear();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let urlpath;

        if (!req.file) {
          urlpath = "https://picsum.photos/1000?random=2"
        } else {
          urlpath = req.file.path;
        }
        const textContent = extractTextFromHTML(req.body.postBody);
        const post = new Post({
          title: req.body.postTitle,
          content: req.body.postBody,
          textContent: textContent,
          date: date,
          time: time,
          UserId: foundUsers[0]._id,
          username: foundUsers[0].username,
          titleimg: urlpath,
          score: 100
        });

        post.save();
        res.redirect("/home");


      }


    })


  });


}


