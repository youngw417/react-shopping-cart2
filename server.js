const express = require('express');
const app = express();
const mongoDb = require('./server/database/connection');
const productRouter = require('./server/products/productRouter');
const orderRouter = require('./server/orders/orderRouter');

app.use(express.json());
app.use('/', express.static(__dirname + '/build'));
app.get('/', (req, res) => res.send(__dirname + '/build/index.html'));

mongoDb();

app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server at port: ${port}`));
