import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminSignIn({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/admin-signin', { email, password }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          alert(res.data.message || "Login successful");
          navigate('/admin-dashboard'); // redirect to admin dashboard
        } else {
          alert(res.data.message || "Login failed");
        }
      })
      .catch(err => {
        console.error("Signin error:", err);
        alert("An error occurred during login.");
      });
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/'); // fallback navigation to welcome/home
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <p>Don't have an account?</p>
          <Link to="/admin-signup">Sign Up</Link>
        </div>
        <div>
          <button type="submit" onClick={handleSignin}>Access</button>
          <button type="button" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
