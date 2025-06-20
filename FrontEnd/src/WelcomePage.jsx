import React, { useState } from 'react';
import EmployeeLogin from './Employee/EmployeeLogin';
import AdminSignIn from './Admin/AdminSignIn';

function WelcomePage() {
  const [showEmployee, setShowEmployee] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminRegister, setShowAdminRegister] = useState(false);

  const handleOpenAdminRegister = () => {
    setShowAdmin(false); 
    setShowAdminRegister(true); 
  };

  return (
    <div className="welcome">
      <h1 id="welcome">WELCOME</h1>
      <h2 id="EMS">Employee Management System</h2>
      <h3 id="devname">Developed By Devaprakash</h3>

      <button id="Employee" onClick={() => setShowEmployee(true)}>Employee</button>
      <button id="Admin" onClick={() => setShowAdmin(true)}>HR Admin</button>

      {showEmployee && (
        <EmployeeLogin onClose={() => setShowEmployee(false)} />
      )}

      {showAdmin && (
        <AdminSignIn
          onClose={() => setShowAdmin(false)}
          onRegister={handleOpenAdminRegister}
        />
      )}

      {showAdminRegister && (
        <AdminRegister
          onClose={() => setShowAdminRegister(false)}
        />
      )}
    </div>
  );
}

export default WelcomePage;
