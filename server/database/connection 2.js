const mongoose = require('mongoose');

module.exports = async () => {
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
