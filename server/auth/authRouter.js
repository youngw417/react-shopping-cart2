const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// const ErrorResponse = require('../utils/errorResponse');

const { User } = require('../users/userDb');

// Register User
// public

router.post('/register', async (req, res, next) => {
  const user = req.body;
  const userDb = await User.find({ email: user.email });
  console.log('userDb', userDb);

  if (userDb.length > 0) {
    res.status(200).json({
      status: 400,
      message: 'User email is alreay in the database.',
    });
  }
  const hash = bc.hashSync(user.password, 12);
  user.password = hash;

  const newUser = new User(user);
  newUser
    .save()
    .then((registeredUser) => {
      const userInfo = {
        fname: registeredUser.fname,
        lname: registeredUser.lname,
        email: registeredUser.email,
      };
      const token = jwt.sign(userInfo, config.get('JWT_SECRET'), {
        expiresIn: '1d',
      });
      res.status(201).json({
        ...userInfo,
        token,
      });
    })
    .catch((error) => {
      next(new Error(error));
    });
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.findOne({ email });
    console.log('newUser', newUser);
    if (newUser && bc.compareSync(password, newUser.password)) {
      const payload = {
        _id: newUser._id,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
      };
      const token = jwt.sign(payload, config.get('JWT_SECRET'), {
        expiresIn: '1d',
      });
      res.status(200).json({
        ...payload,
        password: 'xxxxxx',
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    next(new Error(error));
  }
});
module.exports = router;
