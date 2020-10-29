const express = require('express');
const app = express();
const mongoDb = require('./server/database/connection');
const productRouter = require('./server/products/productRouter');
const orderRouter = require('./server/orders/orderRouter');
const userRouter = require('./server/users/userRouter');
const authRouter = require('./server/auth/authRouter');
// const errorHandler = require('./server/middleware/errors');
const cors = require('cors');
const config = require('config');
app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/build'));
app.get('/', (req, res) => res.send(__dirname + '/build/index.html'));

mongoDb();

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  console.log('err1', err.message);
  console.log('err2', err.name);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

const port = process.env.PORT || config.get('PORT');

app.listen(port, () => console.log(`server at port: ${port}`));
