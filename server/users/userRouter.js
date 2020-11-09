const express = require('express');
const router = express.Router();
const { User } = require('./userDb');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  //   User.findByIdAndDelete(req.params.id).then((deletedUser) => {
  //     res.status(200).end(deletedUser);
  //   });
  const user = await User.findById(req.params.id);
  if (!user) {
    next(new Error('No user is found.'));
  }

  user.remove();
  res.status(200).json({
    message: `User id: ${req.params.id} removed`,
  });
});

module.exports = router;
