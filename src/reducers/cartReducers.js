import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../utils/types';

export const cartReducer = (
  state = {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    shippingAddress: JSON.parse(
      localStorage.getItem('shippingAddress') || '{}'
    ),
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cartItems: action.payload.cartItems,
      };
    case REMOVE_FROM_CART:
      return {
        cartItems: action.payload.cartItems,
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CLEAR_CART:
      return {
        cartItems: [],
      };

    default:
      return state;
  }
};
