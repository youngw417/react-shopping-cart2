import React, { Component } from 'react';
import ProductsCache from '../components/ProductsCache';
import Filter from '../components/Filter';
import Cart from '../components/Cart';

export default class HomeScreen extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <div className="main">
            <Filter />
            <ProductsCache />
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}
