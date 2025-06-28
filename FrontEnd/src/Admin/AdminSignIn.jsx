import React from 'react';
import { Link } from 'react-router-dom';

function AdminSignIn({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Sign In</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <div>
          <p>Don't have an account?</p>
          <Link to="/admin-signup">Sign Up</Link>
        </div>
        <div>
          <Link to="/admin-dashboard"><button>Access</button> </Link>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
