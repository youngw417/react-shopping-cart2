const express = require('express');
// const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();

app.use(express.json());

const mongoDb = async () => {
  mongoose.connect('mongodb://localhost/react-shopping-cart-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  console.log(`Mongodb connected`);
};

mongoDb();

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    { timestamps: true }
  )
);

app.get('/api/products', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.post('/api/order', async (req, res) => {
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

app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server at port: ${port}`));
