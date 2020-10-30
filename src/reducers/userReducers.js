import {
  REGISTER_SUCCESS,
  SET_ERROR,
  RESET_ERROR,
  LOGOUT,
  LOGIN,
} from '../utils/types';

const initialState = {
  user: {
    email: '',
    isLogged: false,
  },
  error: {
    status: false,
    message: '',
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload,
          isLogged: true,
        },
      };
    case SET_ERROR:
      return {
        ...state,
        error: {
          status: true,
          message: action.payload,
        },
      };
    case LOGIN:
      return {
        ...state,
        user: {
          ...action.payload,
          isLogged: true,
        },
      };
    case LOGOUT:
      state = initialState;
      return state;

    case RESET_ERROR:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
      };
    default:
      return state;
  }
};
