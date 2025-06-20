import React, { useState } from 'react';

function EmployeePage() {
  const [leaveRequested, setLeaveRequested] = useState(false);

  // Dummy data for demonstration
  const employee = {
    name: "Devaprakash",
    id: "EMP123",
    position: "Software Developer",
    totalLeaves: 20,
    leavesTaken: 5
  };

  const handleLeaveRequest = () => {
    // Here you would normally make an API call to request leave permission
    setLeaveRequested(true);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h3 id="welcome">Welcome, {employee.name}</h3>

      <div style={{ marginTop: '1rem' }}>
        <h4>Employee Details:</h4>
        <p><strong>ID:</strong> {employee.id}</p>
        <p><strong>Position:</strong> {employee.position}</p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>Leave Details:</h4>
        <p><strong>Total Leaves:</strong> {employee.totalLeaves}</p>
        <p><strong>Leaves Taken:</strong> {employee.leavesTaken}</p>
        <p><strong>Leaves Remaining:</strong> {employee.totalLeaves - employee.leavesTaken}</p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>Request Permission:</h4>
        <button 
          onClick={handleLeaveRequest} 
          disabled={leaveRequested}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: leaveRequested ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            cursor: leaveRequested ? 'default' : 'pointer'
          }}
        >
          {leaveRequested ? 'Permission Requested' : 'Request Leave Permission'}
        </button>
      </div>
    </div>
  );
}

export default EmployeePage;
