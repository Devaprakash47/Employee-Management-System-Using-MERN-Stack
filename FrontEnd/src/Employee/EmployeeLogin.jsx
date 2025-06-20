import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLogin({ onClose }) {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (empId.trim() && password.trim()) {
      navigate('/employeepage'); // Redirect to employee page
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Employee Login</h2>
        <input
          type="text"
          placeholder="Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;
