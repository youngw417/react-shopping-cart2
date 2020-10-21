const express = require('express');
// const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');
const { reset } = require('nodemon');

const app = express();

app.use(express.json());
app.use('/', express.static(__dirname + '/build'));
app.get('/', (req, res) => res.send(__dirname + '/build/index.html'));

const mongoDb = async () => {
  mongoose.connect(
    process.env.MONGODB_URL || 'mongodb://localhost/react-shopping-cart-db',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );

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

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

app.delete('/api/orders/:id', async (req, res) => {
  const deleted = await Order.findByIdAndDelete(req.params.id);
  res.send(deleted);
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server at port: ${port}`));
