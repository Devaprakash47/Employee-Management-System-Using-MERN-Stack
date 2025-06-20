import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import EmployeePage from './Employee/EmployeePage';
import AdminSignIn from './Admin/AdminSignIn';
import AdminSignUp from './Admin//AdminSignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/employeepage" element={<EmployeePage />} />
        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
