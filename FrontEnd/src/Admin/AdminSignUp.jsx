import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminSignUp({ onClose }) {
  const [username, setUsername] = useState('');
  const [email,setemail]=useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/admin', { username,email, password })
      .then(res => {
        if (res.data.success) {
          alert('register successfully!');
          navigate('/admin-signin');
          onClose(); 
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error during login');
      });
      setUsername('');
      setemail('');
      setPassword('');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Admin SignUp</h2>
        
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
            onChange={(e) => setemail(e.target.value)}
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
            <p>Already have account?</p>
            <Link to="/admin-signin">Sign In</Link>
          </div>
          <div>
            <button onClick={handleSignup}>Register</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        
      </div>
    </div>
  );
}

export default AdminSignUp;
