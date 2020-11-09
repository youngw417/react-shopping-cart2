import {
  REGISTER_SUCCESS,
  SET_ERROR,
  RESET_ERROR,
  LOGOUT,
  LOGIN,
  ADD_TO_CART,
} from '../utils/types';
import axiosWithAuth from '../utils/axioswithauth';

export const registerUser = (user) => (dispatch) => {
  return axiosWithAuth()
    .post('/api/auth/register', user)
    .then((res) => {
      if (res.data.status === 400) {
        dispatch({
          type: SET_ERROR,
          payload: res.data.message,
        });
      } else {
        console.log(res.data);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
      localStorage.setItem('token', res.data.token);
      console.log('token', res.data.toen);
    })
    .catch((err) => {
      console.log('error1', err);
    });
};

export const logout = () => {
  localStorage.removeItem('cartItems');
  return {
    type: LOGOUT,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

const fetch_cartItems = () => {
  return axiosWithAuth()
    .get('/api/carts')
    .then((res) => {
      const cartItems = res.data.cartItems;

      return cartItems;
    })
    .catch((err) => console.log(err));
};
export const logIn = (user) => (dispatch) => {
  return axiosWithAuth()
    .post('/api/auth/login', user)
    .then((res) => {
      dispatch({
        type: LOGIN,
        payload: res.data,
      });
      localStorage.setItem('token', res.data.token);
      const itemsInCart = JSON.parse(localStorage.getItem('cartItems'));

      if (!itemsInCart) {
        fetch_cartItems().then((items) => {
          dispatch({
            type: ADD_TO_CART,
            payload: {
              cartItems: items,
            },
          });
          localStorage.setItem('cartItems', JSON.stringify(items));
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    });
};
