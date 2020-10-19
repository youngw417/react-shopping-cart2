import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };

    this.props.createOrder(order);
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header"> Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} In the cart{' '}
          </div>
        )}

        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div>{item.title}</div>

                      <div className="right">
                        {formatCurrency(item.price)} X {item.count}{' '}
                        <button
                          className="button btn-cart"
                          onClick={() =>
                            this.props.removeFromCart(cartItems, item)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length > 0 ? (
            <div className="cart cart-total">
              <div>
                <div className="total">
                  <div>
                    Total:{' '}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>

                  <div>
                    <button
                      className="button primary"
                      onClick={() => this.setState({ showCheckout: true })}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
                <div>
                  {this.state.showCheckout ? (
                    <div className="cart cart2">
                      <Fade right cascade>
                        <form onSubmit={this.createOrder}>
                          <ul className="form-container">
                            <li>
                              <label htmlFor="">Email</label>
                              <input
                                name="email"
                                type="email"
                                required
                                // value={this.state.email}
                                onChange={this.handleChange}
                              />
                            </li>
                            <li>
                              <label htmlFor="">Name</label>
                              <input
                                name="name"
                                type="text"
                                required
                                // value={this.state.name}
                                onChange={this.handleChange}
                              />
                            </li>
                            <li>
                              <label htmlFor="">Address</label>
                              <input
                                name="address"
                                type="text"
                                required
                                // value={this.state.address}
                                onChange={this.handleChange}
                              />
                            </li>
                            <li>
                              <button className="button primary" type="submit">
                                Submit
                              </button>
                            </li>
                          </ul>
                        </form>
                      </Fade>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, { removeFromCart })(Cart);
