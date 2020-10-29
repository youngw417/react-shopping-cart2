// feature-1

import React from 'react';

import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import PrivateRoute from './utils/privateroute';
import Logout from './components/logout';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">React Shopping Cart</Link>
              <div className="header-link-right">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/logout">Logout</Link>
                {/* <Link to="/admin">Admin</Link> */}
              </div>
            </header>
            <main>
              <Switch>
                <Route path="/admin" component={AdminScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/register" component={RegisterScreen} />
                <PrivateRoute path="/" component={HomeScreen} />
                <PrivateRoute path="/logout" component={Logout} />
              </Switch>
            </main>
            <footer>All right reverved.</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
