
const express = require('express');
const router = express.Router();
const { Order } = require('./orderDb');

router.post('/', async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    res.send({
      message: 'Complete data is required.',
    });
  }

  const order = await Order(req.body).save();

  try {
    res.send(order);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const orders = await Order.find({});
  try {
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
