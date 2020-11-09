import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import { Link } from 'react-router-dom';
import { clearCart } from '../actions/cartActions';

const logOut = (props) => {
  const loggingout = (user, items) => {
    if (items) {
      // if there is cartItems, save it in server database, and clear 
      // cart and localstorage cartItems before logging out
      props.clearCart(user, items);
    }

    props.logout();
    localStorage.removeItem('token');
  };

  return (
    <div>
      <Link
        to="/logout"
        onClick={() => loggingout(props.userId, props.cartItems)}
      >
        Logout
      </Link>{' '}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    userId: state.user.user._id,
  };
};

export default connect(mapStateToProps, { logout, clearCart })(logOut);
