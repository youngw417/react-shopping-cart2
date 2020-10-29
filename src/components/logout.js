import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

const logOut = (props) => {
  return <div>{props.logout()}</div>;
};

export default connect(null, { logout })(logOut);
