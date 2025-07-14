import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeLogin({ onClose }) {
  const [empId, setEmpId] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!empId.trim() || !dob.trim()) {
      return alert('Please enter Employee ID and DOB');
    }

    try {
      const res = await axios.post('http://localhost:3001/api/employee-login', {
        empId,
        dob
      }, { withCredentials: true });

      if (res.data.success) {
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
          type="text"
          placeholder="Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <input
          type="date"
          placeholder="DOB"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
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
