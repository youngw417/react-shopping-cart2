import { ADD_TO_CART, REMOVE_FROM_CART } from '../utils/types';

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
