require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const _ = require('lodash');
const port = 8080;
let posts = [];
let myArray = Object.values(posts);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

// mongoose.connect("mongodb://localhost:27017/blogDBpost", {useNewUrlParser: true});
mongoose.connect(process.env.CLUSTER, { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    Post.find({}, function(err, posts){
    res.render('browse.ejs', {
        posts: posts
    });
})
});
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
    
    Post.find((err,posts)=>{
        if(err){
            console.log(err);
        }else{
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
    res.render('chat.ejs');
})
app.get("/profile", (req, res) => {
    res.render('profile.ejs');
})

app.listen(process.env.PORT || port,()=>{
    console.log(`The application started successfully on port ${port}`);
});

