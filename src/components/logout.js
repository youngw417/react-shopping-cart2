import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import { Link } from 'react-router-dom';

const logOut = (props) => {
  const loggingout = () => {
    props.logout();
    localStorage.removeItem('token');
  };

  return (
    <div>
      <Link to="/logout" onClick={() => loggingout()}>
        Logout
      </Link>{' '}
    </div>
  );
};

export default connect(null, { logout })(logOut);
