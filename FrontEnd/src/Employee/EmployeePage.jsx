import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeePage() {
  const [employee, setEmployee] = useState(null);
  const [leaveRequested, setLeaveRequested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/employees/", {
          withCredentials: true,
        });
        setEmployee(res.data);
      } catch (err) {
        console.error("Error fetching employee data:", err);
        setError("Session expired or unauthorized.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  const handleLeaveRequest = async () => {
    try {
      // Optional: You can POST to a real endpoint here
      // await axios.post("http://localhost:3001/api/employees/request-leave", { employeeId: employee._id });

      setLeaveRequested(true);
      alert("Leave request submitted successfully!");
    } catch (err) {
      console.error("Leave request failed:", err);
      alert("Failed to request leave.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!employee) return <p>Employee not found or not logged in.</p>;

  const leavesRemaining = employee.totalLeaves - employee.leavesTaken;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Dashboard</h2>

      <div style={styles.section}>
        <h3>Employee Information</h3>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>ID:</strong> {employee.employeeId}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Joining Date:</strong> {new Date(employee.joiningDate).toLocaleDateString()}</p>
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
          {leaveRequested ? "Leave Requested" : "Request Leave"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "650px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f0f4f8",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
  },
  section: {
    marginTop: "1.5rem",
    padding: "1rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
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
