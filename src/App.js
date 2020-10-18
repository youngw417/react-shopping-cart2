// feature-1

import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    };
  }

  createOrder = (order) => {
    alert('Need to create order for ' + order.name);
  };

  addToCart = (product) => {
    const cartItems = [...this.state.cartItems];

    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }

    this.setState({ cartItems });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    let cartItems = [...this.state.cartItems];

    cartItems = cartItems.filter((item) => item._id !== product._id);

    this.setState({ ...product, cartItems });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>All right reverved.</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
