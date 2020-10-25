const express = require('express');
const router = express.Router();
const { Order } = require('./orderDb');

router.post('/', async (req, res) => {
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

  res.send(order);
});

router.get('/', async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Order.findByIdAndDelete(req.params.id);
  res.send(deleted);
});

module.exports = router;
