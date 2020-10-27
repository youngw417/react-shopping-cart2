const express = require('express');
const app = express();
const mongoDb = require('./server/database/connection');
const productRouter = require('./server/products/productRouter');
const orderRouter = require('./server/orders/orderRouter');
const userRouter = require('./server/users/userRouter');
const authRouter = require('./server/auth/authRouter');

app.use(express.json());
app.use('/', express.static(__dirname + '/build'));
app.get('/', (req, res) => res.send(__dirname + '/build/index.html'));

mongoDb();

app.use('/api', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: err.message,
  });
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server at port: ${port}`));
