import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminSignUp({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    axios.post('http://localhost:3001/admin-signup', { username, email, password }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          alert('Registered successfully!');
          setUsername('');
          setEmail('');
          setPassword('');
          navigate('/admin-signin');
          onClose();
        } else {
          alert(res.data.message || 'Registration failed.');
        }
      })
      .catch(err => {
        console.error("Signup error:", err);
        alert('Error during registration');
      });
  };const handleclose=()=>{navigate('/admin-signin')}

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin Sign Up</h2>

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

        <div>
          <p>Already have an account?</p>
          <Link to="/admin-signin">Sign In</Link>
        </div>

        <div>
          <button onClick={handleSignup}>Register</button>
          <button type="button" onClick={handleclose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;
