import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderReducer } from './reducers/orderReducers';
import { userReducer } from './reducers/userReducers';

const initialState = {};
const composeEnhancer =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  combineReducers({
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
