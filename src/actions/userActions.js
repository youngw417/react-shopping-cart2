import {
  REGISTER_SUCCESS,
  SET_ERROR,
  RESET_ERROR,
  LOGOUT,
  LOGIN,
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
  return {
    type: LOGOUT,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

export const logIn = (user) => (dispatch) => {
  return axiosWithAuth()
    .post('/api/auth/login', user)
    .then((res) => {
      console.log('res.data', res.data);
      dispatch({
        type: LOGIN,
        payload: res.data,
      });
      localStorage.setItem('token', res.data.token);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    });
};
