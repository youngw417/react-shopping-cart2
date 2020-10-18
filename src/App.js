// feature-1

import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
      size: '',
      sort: '',
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

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price - b.price
            : sort === 'highest'
            ? b.price - a.price
            : a._id - b._id
        ),
    });
  };

  filterProducts = (e) => {
    if (e.target.value === '') {
      this.setState({
        size: e.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
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
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                />
                <Products
                  // products={this.state.products}
                  addToCart={this.addToCart}
                />
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
