const _ = require('lodash');
const Post = require('../schema/post');
module.exports = function(app){

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
                  content: i.content,
                  username:req.username
                });
              }
            });
          }
        });
      });
      
    
         
    }