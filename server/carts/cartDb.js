const mongoose = require('mongoose');
const shortid = require('shortid');

module.exports.Cart = mongoose.model(
  'cart',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      userId: String,
      cartItems: [
        {
          _id: String,
          image: String,
          title: String,
          description: String,
          price: Number,
          count: Number,
          availableSizes: [String],
        },
      ],
    },
    { timestamps: true }
  )
);

// req.body {
//   _id: 'cRNOZxpMs',
//   cartItems: [
//     {
//       availableSizes: [Array],
//       _id: 'Fr3JpSbC8',
//       image: '/images/dress6.jpg',
//       title: 'Great Dress of dress in blue and red spot by Young2',
//       description: 'This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.',
//       price: 555,
//       __v: 0,
//       count: 1
//     }
//   ]
// }
