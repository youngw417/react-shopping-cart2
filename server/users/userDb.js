const mongoose = require('mongoose');
const shortid = require('shortid');

module.exports.User = mongoose.model(
  'users',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    fname: {
      type: String,
      required: [true, 'Please add a first name'],

      trim: true,
    },
    lname: {
      type: String,
      required: [true, 'Please add a last name'],

      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please add a email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  })
);
