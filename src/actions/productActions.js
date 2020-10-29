import axios from 'axios';
import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from '../utils/types';

export const fetchProducts = () => async (dispatch) => {
  // const res = await fetch('/api/products');
  // const data = await res.json();
  const res = await axios('/api/products');
  const data = res.data;

  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size,
      items:
        size === ''
          ? products
          : products.filter((item) => item.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === 'latest') {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
    // console.log('sort', sortedProducts);
    // sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else if (sort === 'lowest') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return {
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort,
      items: sortedProducts,
    },
  };
};
