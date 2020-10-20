// feature-1

import React from 'react';

import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">React Shopping Cart</Link>
              <Link to="/admin">Admin</Link>
            </header>
            <main>
              <Switch>
                <Route path="/admin" component={AdminScreen} />
                <Route path="/" component={HomeScreen} />
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
