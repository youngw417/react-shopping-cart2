import React, { Component } from 'react';
import Order from '../components/Order';

export default class AdminScreen extends Component {
  render() {
    return (
      <div>
        <h1>Orders</h1>
        <Order />
      </div>
    );
  }
}
