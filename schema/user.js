const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    name: String,
    photo: String,
    secret: String,
  });


  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);

module.exports = new mongoose.model('User', userSchema);
