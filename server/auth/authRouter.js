const router = require('express').Router();
const bc = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const { User } = require('../users/userDb');

// Register User
// public

router.post('/register', async (req, res, next) => {
  const user = req.body;
  const hash = bc.hashSync(user.password, 12);
  user.password = hash;

  const newUser = new User(user);
  const registeredUser = await newUser.save();

  res.send(registeredUser);

  try {
    res.status(201).json({
      fname: registeredUser.fname,
      lname: registeredUser.lname,
      email: registeredUser.email,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
