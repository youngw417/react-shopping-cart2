// feature-1

import React from 'react';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import UserDashboard from './screens/UserDashboard';
import PrivateRoute from './utils/privateroute';
import Logout from './components/logout';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="grid-container">
          <header>
            <Link to="/">React Shopping Cart</Link>
            <div className="header-link-right">
              {this.props.islogged ? null : <Link to="/login">Login</Link>}
              {this.props.islogged ? null : (
                <Link to="/register">Register</Link>
              )}

              {this.props.islogged ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : null}

              {this.props.islogged ? <Logout /> : null}
            </div>
          </header>
          <main>
            <Switch>
              <Route path="/admin" component={AdminScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <PrivateRoute path="/dashboard" component={UserDashboard} />
              <Route path="/" component={HomeScreen} />
            </Switch>
          </main>
          <footer>All right reverved.</footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  (state) => ({
    islogged: state.user.user.isLogged,
  }),
  {}
)(App);
