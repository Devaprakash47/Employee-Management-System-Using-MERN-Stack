import React from 'react';

function AdminSignIn({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Sign In</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <div>
          <button>Access</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
