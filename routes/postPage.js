const _ = require('lodash');

module.exports = function (app, Post, User) {

  app.get('/posts/:userId', function (req, res) {
    //let requestedTitle = _.lowerCase(req.params.userId);
    let requestedId = req.params.userId;
    Post.find((err, posts) => {
      if (err) {
        console.log(err);
      } else {
        posts.forEach((i) => {
          const storedId = i.id;

          if (storedId === requestedId) {
            res.render('post.ejs', {
              id: i._id,
              title: i.title,
              content: i.content,
              imgurl: i.titleimg,
              username: req.username,
              likes: i.likes.length,
              dislikes: i.dislikes.length,
              shares: i.shares.length,
              comments: i.comments,
            });
          }
        });
      }
    });
  });
  app.post('/addLike', function (req, res) {
    const postid = req.body.likePost;

    if (req.isAuthenticated()) {
      const user = req.user;
      const userId = user._id;

      Post.findById(postid, function (err, post) {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          if (post) {
            if (post.likes.includes(userId)) {
              console.log('already liked');
            } else {
              post.likes.push(userId);
              post.save(function (err) {
                if (err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  res.redirect('/posts/' + postid);
                }
              });
            }
          } else {
            console.log('Post not found');
            res.status(404).send('Post not found');
          }
        }
      });
    } else {
      // If the user is not authenticated, redirect them to the login page
      res.redirect('/login');
    }
  });

  app.post('/disLike', function (req, res) {



    const postid = req.body.likePost;

    if (req.isAuthenticated()) {

      const user = req.user;
      const userId = user._id;



      Post.findById(postid, function (err, post) {
        if (err) {
          console.log(err);
        } else {
          if (post.dislikes.includes(userId)) {
          } else {
            post.dislikes.push(userId);
            post.save();
            res.redirect('/posts/' + postid);
          }
        }
      });
    } else {
      // If the user is not authenticated, redirect them to the login page
      res.redirect('/login');
    }

  });

  app.post('/comment', function (req, res) {
    // console.log(req.body);

    // console.log(req.body.user);
    const postid = req.body.commentId;
    const comment = req.body.postComment;

    if (req.isAuthenticated()) {
      const user = req.user;
      const userId = user._id;

      Post.findById(postid, function (err, post) {
        if (err) {
          console.log(err);
        } else {
          const newComment = {
            UserId: userId,
            username: user.username,
            userComment: comment,
            $timeStamp: new Date(),
            followUp: []
          };

          post.comments.push(newComment);
          post.save();
          res.redirect('/posts/' + postid);
        }
      });
    } else {
      // If the user is not authenticated, redirect them to the login page
      res.redirect('/login');
    }
  });
  app.post('/followUp', function (req, res) {
    const postId = req.body.postId; // Assuming you have a postId field in your request body
    const commentId = req.body.commentId;
    const followUpComment = req.body.postComment;



    if (req.isAuthenticated()) {
      const user = req.user;
      const userId = user._id;

      Post.findById({ _id: postId }, function (err, post) {
        if (err) {
          console.log(err);
        } else {
          const newFollowUp = {
            UserId: userId,
            username: user.username,
            userComment: followUpComment,
            $timeStamp: new Date()
          };

          // Find the comment by its ID and push the new follow-up comment
          // console.log(post);
          const comment = post.comments.find(c => c._id.toString() === commentId);
          if (comment) {
            comment.followUp.push(newFollowUp);
          }

          post.save();
          res.redirect('/posts/' + postId);
        }
      });
    } else {
      // If the user is not authenticated, redirect them to the login page
      res.redirect('/login');
    }
  });

  app.post('/share', function (req, res) {

    const postId = req.body.likePost; // Assuming you have a postId field in your request body
    // Assuming you have a userId field in your request body

    if (req.isAuthenticated()) {
      const userId = req.user.id;
      Post.findById(postId, function (err, post) {
        if (err) {
          res.redirect('/login');
          console.log(err);
        } else {
          post.shares.push(userId); // Insert the userId into the share[] array of the post
          post.save();
          res.redirect('/posts/' + postId);
        }
      });
    } else {
      // If the user is not authenticated, redirect them to the login page
      res.redirect('/login');
    }
  });

}