// EmployeeLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeLogin({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return alert('Please enter Email and Password');
    }

    try {
      const res = await axios.post('http://localhost:3001/employee-login', {
        email,
        password,
      }, { withCredentials: true });

      if (res.data.success) {
        const employee = res.data.employee;
        alert(`Welcome, ${employee.name}`);
        // Optional: save employee info in localStorage or context
        localStorage.setItem('employee', JSON.stringify(employee));
        navigate('/employeepage');
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Error during login');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Employee Login</h2>
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;
