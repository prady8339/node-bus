module.exports = function (app, Post, User) {


  app.get("/profile/:userId", async (req, res) => {
    try {

      let requestedUser = req.params.userId;

      const posts = await Post.find({ username: requestedUser }).sort({ "score": -1 }).exec();
      const homeData = [];

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const userinfo = await User.findOne({ _id: post.UserId }).exec();
        const postWithUser = {
          post: post,
          userdata: userinfo
        };
        homeData.push(postWithUser);
      }

      User.find({ username: requestedUser }, (err, user) => {
        if (err) {
          // Handle any potential errors
          console.error(err);
          // Redirect to the home page
          return res.redirect('/');
        }

        if (user.length === 0) {
          // User not found, redirect to the home page
          return res.redirect('/home');
        }

        // User found, continue rendering the profile page
        if (!req.isAuthenticated()) {
          res.render('profile.ejs', { homeData: homeData, user: user[0], username: undefined });
        } else {
          res.render('profile.ejs', { homeData: homeData, user: user[0], username: req.user.username });
        }
      });
      // console.log(homeData[0].userdata.id);
      // console.log(posts[0].UserId);
      //console.log(homeData);

    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  // app.get('/profile/:userId', function (req, res) {
  //   let requestedUser = req.params.userId;

  //   User.find({ username: requestedUser }, (err, user) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).send('Internal Server Error');
  //       return;
  //     }

  //     if (user.length === 0) {
  //       res.status(404).send('User not found');
  //       return;
  //     }



  //     const data = user[0];
  //     if (!data.photo) {
  //       console.log('Profile image not found');
  //       data.photo = "resources / favicon - 32x32.png";
  //     }


  //     Post.find({ "UserId": { $eq: req.user.id } }, function (err, posts) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         if (foundUsers) {
  //           res.render("profile", {
  //             post: posts,
  //             username: data.username,
  //             email: data.email,
  //             photo: data.photo
  //           });
  //         } else {
  //           res.render("profile", {
  //             username: data.username,
  //             email: data.email,
  //             photo: data.photo
  //           });
  //         }
  //       }
  //     });


  //   });
  // });


};
