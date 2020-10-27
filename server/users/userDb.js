const mongoose = require('mongoose');
const shortid = require('shortid');

module.exports.User = mongoose.model(
  'users',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    fname: String,
    lname: String,
    email: String,
    password: String,
  })
);
