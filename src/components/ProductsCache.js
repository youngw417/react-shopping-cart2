import React, { Component } from 'react';
import formatCurrency from '../utils/util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

class ProductsCache extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({
      product: null,
    });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={'#' + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={product.image} alt={product.title} />
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        className="button primary"
                        onClick={() =>
                          this.props.addToCart(this.props.cartItems, product)
                        }
                      >
                        Add to the cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes:{' '}
                    {product.availableSizes.map((x) => (
                      <span>
                        {' '}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(this.props.cartItems, product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.filteredItems,
    cartItems: state.cart.cartItems,
    isLogged: state.user.user.isLogged,
  };
};

export default connect(mapStateToProps, {
  fetchProducts,
  addToCart,
})(ProductsCache);