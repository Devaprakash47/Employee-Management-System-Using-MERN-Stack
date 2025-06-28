import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminSignIn({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/admin-signin', { username, password })
      .then(res => {
        if (res.data.success) {
          alert('Login successful!');
          navigate('/admin-dashboard');
          onClose(); // Close modal
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error during login');
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <p>Don't have an account?</p>
            <Link to="/admin-signup">Sign Up</Link>
          </div>
          <div>
            <button type="submit">Access</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignIn;
