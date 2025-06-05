import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import EmployeePage from './EmployeePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/employeepage" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
