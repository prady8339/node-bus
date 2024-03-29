require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const connection = require('./db');
connection();

const User = require('./schema/user');
const passportme = require('./schema/passport');

(async () => {
  await passportme(app, User, passport, hostname, port);

  const Post = require('./schema/post');
  const imgModel = require('./schema/image');
  const chatModel = require('./schema/chat');

  require('./routes/chat')(app, User, chatModel);
  require('./routes/login')(app, passport);
  require('./routes/secrets')(app, Post);
  require('./routes/submit')(app, User);
  require('./routes/register')(app, User, passport);
  require('./routes/home')(app, Post, User);
  require('./routes/compose')(app, Post, User);
  require('./routes/postPage')(app, Post, User);
  require('./routes/search')(app, Post, User);
  require('./routes/profile')(app, Post, User);
  require('./routes/settings')(app, imgModel, __dirname);
  // require('./routes/websocket/server')(app);

  app.listen(process.env.PORT || port, () => {
    console.log(`The application started successfully on port http://${hostname}:${port}`);
  });
})();
