import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminSignUp({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    axios.post('http://localhost:3001/admin-signup', { username, email, password }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          alert('Registered successfully!');
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate('/admin-signin');
        } else {
          alert(res.data.message || 'Registration failed.');
        }
      })
      .catch(err => {
        console.error("Signup error:", err);
        alert('Error during registration');
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div>
            <p>Already have an account?</p>
            <Link to="/admin-signin">Sign In</Link>
          </div>

          <div>
            <button type="submit">Register</button>
            <button type="button" onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignUp;
