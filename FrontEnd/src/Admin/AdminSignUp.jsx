import React from 'react';
import { Link } from 'react-router-dom';

function AdminSignUp({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Sign Up</h2>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <div>
          <p>Already have an account?</p>
          <Link to="/admin-signin">Sign In</Link>
        </div>
        <div>
          <button>Register</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;
