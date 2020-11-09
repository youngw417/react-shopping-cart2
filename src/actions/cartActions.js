import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../utils/types';
import axiosWithAuth from '../utils/axioswithauth';

export const addToCart = (items, product) => (dispatch) => {
  const cartItems = items.slice();
  let alreadyExists = false;

  cartItems.forEach((x) => {
    if (x._id === product._id) {
      x.count++;
      alreadyExists = true;
    }
  });
  if (!alreadyExists) {
    cartItems.push({
      ...product,
      count: 1,
    });
  }

  dispatch({
    type: ADD_TO_CART,
    payload: {
      cartItems,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeFromCart = (items, product) => {
  const cartItems = [...items].filter((x) => x._id !== product._id);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  return {
    type: REMOVE_FROM_CART,
    payload: {
      cartItems,
    },
  };
};

const saveToServer = (userId, cartItems) => {
  const cartInfo = {
    userId,
    cartItems,
  };

  return axiosWithAuth()
    .post('/api/carts', cartInfo)
    .then(() => {
      console.log('saving cart items in database.....');
    })
    .catch((err) => {
      console.log('error1', err);
    });
};

export const clearCart = (userId, cartItems) => {
  saveToServer(userId, cartItems);
  localStorage.removeItem('cartItems');
  return {
    type: CLEAR_CART,
  };
};
