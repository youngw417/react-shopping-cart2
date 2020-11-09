const express = require('express');
const router = express.Router();
const { Cart } = require('./cartDb');
const authenticate = require('../auth/authenticate');

router.post('/', authenticate, async (req, res, next) => {
  const { userId } = req.body;
  if (req.user._id !== userId) {
    res.status(401).json({
      message: 'you are not autherized to save your cart items',
    });
  }

  console.log(req.body);

  try {
    const cartItems = await Cart.find({ userId: req.user._id });

    if (cartItems) {
      await Cart.deleteMany({ userId: req.user._id });
    }

    const cart = await Cart(req.body).save();

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.get('/', authenticate, async (req, res, next) => {
  try {
    const cartItems = await Cart.find({ userId: req.user._id });
    res.json(cartItems[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
