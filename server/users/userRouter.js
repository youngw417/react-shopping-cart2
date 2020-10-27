const express = require('express');
const router = express.Router();
const { User } = require('./userDb');

router.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.send(savedUser);
});
router.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.send(deletedUser);
});

module.exports = router;
