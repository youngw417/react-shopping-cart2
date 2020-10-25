import React from 'react';
import Login from '../components/Login';

export default function RegisterScreen() {
  return (
    <div className="login-screen">
      <div className="log-in-title">
        <i class="fas fa-sign-in-alt"></i>
        {/* <i class="fas fa-user-plus"></i> */}
        <h2>Login</h2>
      </div>

      <Login />
    </div>
  );
}
