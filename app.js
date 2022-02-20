require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");


const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const connection = require('./db');
connection();

const User = require('./schema/user');
const passportme = require('./schema/passport');
passportme(app,User,passport);

const Post = require('./schema/post');
const imgModel = require('./schema/image');

require('./routes/chat')(app,User);
require('./routes/login')(app,passport);
require('./routes/secrets')(app,Post);
require('./routes/submit')(app,User);
require('./routes/register')(app,User,passport);
require('./routes/home')(app,Post,Trend);
require('./routes/compose')(app,Post)
require('./routes/postPage')(app);
require('./routes/profile')(app,imgModel);
require('./routes/settings')(app,imgModel,__dirname);

app.listen(process.env.PORT || port, () => {
  console.log(`The application started successfully on port http://localhost:${port}`);
});

