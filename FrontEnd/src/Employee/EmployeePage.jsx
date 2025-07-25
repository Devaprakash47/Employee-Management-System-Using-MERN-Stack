import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeePage() {
  const [employee, setEmployee] = useState(null);
  const [leaveRequested, setLeaveRequested] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/employees/me", {
          withCredentials: true,
        });
        setEmployee(res.data);
      } catch (err) {
        alert("Session expired or unauthorized.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  const handleLeaveRequest = () => {
    setLeaveRequested(true);
    alert("Leave request submitted successfully!");
    // Optional: POST to a leave request endpoint here
  };

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found or not logged in.</p>;

  const leavesRemaining = employee.totalLeaves - employee.leavesTaken;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Dashboard</h2>

      <div style={styles.section}>
        <h3>Employee Information</h3>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>ID:</strong> {employee.employeeId}</p>
        <p><strong>Position:</strong> {employee.position}</p>
      </div>

      <div style={styles.section}>
        <h3>Leave Details</h3>
        <p><strong>Total Leaves:</strong> {employee.totalLeaves}</p>
        <p><strong>Leaves Taken:</strong> {employee.leavesTaken}</p>
        <p><strong>Leaves Remaining:</strong> {leavesRemaining}</p>
      </div>

      <div style={styles.section}>
        <h3>Leave Request</h3>
        <button
          onClick={handleLeaveRequest}
          disabled={leaveRequested}
          style={{
            ...styles.button,
            backgroundColor: leaveRequested ? "#aaa" : "#28a745",
            cursor: leaveRequested ? "not-allowed" : "pointer"
          }}
        >
          {leaveRequested ? "Permission Requested" : "Request Leave Permission"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginTop: "1.5rem",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
  button: {
    padding: "0.6rem 1.2rem",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
  },
};

export default EmployeePage;
