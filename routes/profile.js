module.exports = function (app, User) {
  app.get('/profile/:userId', function (req, res) {
    let requestedUser = req.params.userId;

    User.find({ username: requestedUser }, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (user.length === 0) {
        res.status(404).send('User not found');
        return;
      }

      const data = user[0];
      if (!data.photo) {
        console.log('Profile image not found');
        data.photo = "resources / favicon - 32x32.png";
      }
      res.render('profile.ejs', {
        username: data.username,
        email: data.email,
        photo: data.photo
      });
    });
  });
};
