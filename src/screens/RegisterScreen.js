import React from 'react';
import Register from '../components/Register';

export default function RegisterScreen() {
  return (
    <div className="login-screen">
      <div className="log-in-title">
        {/* <i class="fas fa-sign-in-alt"></i> */}
        <i class="fas fa-user-plus"></i>
        <h2>Register</h2>
      </div>

      <Register />
    </div>
  );
}
