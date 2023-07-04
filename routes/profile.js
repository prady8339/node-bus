
module.exports = function (app, User) {

  app.get('/profile/:userId', function (req, res) {
    let requestedUser = req.params.userId;

    User.find({ username: requestedUser }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        const data = user[0];
        console.log(data.profileImg);
        res.render('profile.ejs', {
          username: data.username,
          email: data.email,
          imgurl: data.profileImg,
        });


      }
    });
  });


}