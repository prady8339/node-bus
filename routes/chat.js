

module.exports = function (app, User, chatModel) {

  app.get("/chat", async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const chats = await chatModel.find({}).limit(0); // Fetch an empty chat array

        res.render('chat.ejs', {
          username: req.user.username,
          chat: chats,
          chatrooms: chats
        });
      } else {
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err);
    }
  });


  app.get("/chat/:chatId", async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const chatId = req.params.chatId;
        const chat = await chatModel.findById(chatId); // Find chat by ID
        console.log(chat);
        res.render('chat.ejs', {
          username: req.user.username,
          chat: chat.chats,
          chatrooms: []
        });
      } else {
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/chat', async (req, res) => {
    try {
      const foundUsers = await User.find({ "_id": { $eq: req.user.id } });
      const chat = new chatModel({
        username: foundUsers[0].username,
        content: req.body.content
      });
      await chat.save();
      res.redirect('/chat');
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/delete', async (req, res) => {
    try {

      await chatModel.findByIdAndRemove(req.body.deletePost);
      res.redirect("/chat");
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/modify', (req, res) => {
    res.send("<h1>under construction... :)</h1> ");
  });
};
