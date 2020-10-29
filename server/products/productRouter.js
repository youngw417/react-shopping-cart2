const express = require('express');
const router = express.Router();
const { Product } = require('./productDb');

router.get('/', async (req, res, next) => {
  const products = await Product.find({});
  try {
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  try {
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
