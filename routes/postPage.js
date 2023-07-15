const _ = require('lodash');

module.exports = function (app, Post, User) {
  app.get('/posts/:userId', async function (req, res) {
    try {
      let requestedId = req.params.userId;
      const posts = await Post.find().exec();
      for (const post of posts) {
        const storedId = post.id;
        if (storedId === requestedId) {
          res.render('post.ejs', {
            id: post._id,
            title: post.title,
            content: post.content,
            imgurl: post.titleimg,
            username: req.username,
            likes: post.likes.length,
            dislikes: post.dislikes.length,
            shares: post.shares.length,
            comments: post.comments,
          });
          break;
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/addLike', async function (req, res) {
    try {
      const postid = req.body.likePost;

      if (req.isAuthenticated()) {
        const user = req.user;
        const userId = user._id;

        const post = await Post.findById(postid).exec();
        if (post) {
          if (post.likes.includes(userId)) {
            console.log('already liked');
          } else {
            post.likes.push(userId);
            await post.save();
          }
        } else {
          console.log('Post not found');
          res.status(404).send('Post not found');
          return;
        }
        res.redirect('/posts/' + postid);
      } else {
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/disLike', async function (req, res) {
    try {
      const postid = req.body.likePost;

      if (req.isAuthenticated()) {
        const user = req.user;
        const userId = user._id;

        const post = await Post.findById(postid).exec();
        if (post) {
          if (!post.dislikes.includes(userId)) {
            post.dislikes.push(userId);
            await post.save();
          }
        } else {
          console.log('Post not found');
          res.status(404).send('Post not found');
          return;
        }
        res.redirect('/posts/' + postid);
      } else {
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/comment', async function (req, res) {
    try {
      const postid = req.body.commentId;
      const comment = req.body.postComment;

      if (req.isAuthenticated()) {
        const user = req.user;
        const userId = user._id;

        const post = await Post.findById(postid).exec();
        if (post) {
          const newComment = {
            UserId: userId,
            username: user.username,
            userComment: comment,
            $timeStamp: new Date(),
            followUp: []
          };
          post.comments.push(newComment);
          await post.save();
        } else {
          console.log('Post not found');
          res.status(404).send('Post not found');
          return;
        }
        res.redirect('/posts/' + postid);
      } else {
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/followUp', async function (req, res) {
    try {
      const postId = req.body.postId;
      const commentId = req.body.commentId;
      const followUpComment = req.body.postComment;

      if (req.isAuthenticated()) {
        const user = req.user;
        const userId = user._id;

        const post = await Post.findById({ _id: postId }).exec();
        if (post) {
          const newFollowUp = {
            UserId: userId,
            username: user.username,
            userComment: followUpComment,
            $timeStamp: new Date()
          };
          const comment = post.comments.find(c => c._id.toString() === commentId);
          if (comment) {
            comment.followUp.push(newFollowUp);
            await post.save();
          }
        } else {
          console.log('Post not found');
          res.status(404).send('Post not found');
          return;
        }
        res.redirect('/posts/' + postId);
      } else {
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/share', async function (req, res) {
    try {
      const postId = req.body.likePost;
      if (req.isAuthenticated()) {
        const userId = req.user.id;
        const post = await Post.findById(postId).exec();
        if (post) {
          post.shares.push(userId);
          await post.save();
          res.redirect('/posts/' + postId);
        } else {
          console.log('Post not found');
          res.status(404).send('Post not found');
        }
      } else {
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
};
