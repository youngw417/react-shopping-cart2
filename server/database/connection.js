const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
  mongoose.connect(process.env.MONGODB_URL || config.get('MONGOBD_URL'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  console.log(`Mongodb connected`);
};
