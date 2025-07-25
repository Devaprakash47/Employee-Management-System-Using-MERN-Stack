import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeePage() {
  const [employee, setEmployee] = useState(null);
  const [leaveRequested, setLeaveRequested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/employee/profile", {
          withCredentials: true,
        });

        if (res.data.success) {
          setEmployee(res.data.employee);
          setLeaveHistory(res.data.employee.leaveRequests || []);
        } else {
          alert("Unauthorized or session expired.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch employee. Unauthorized or session expired.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  const handleLeaveRequest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/employee/request-leave",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Leave request submitted!");
        setLeaveRequested(true);
        setLeaveHistory((prev) => [...prev, res.data.newRequest]);
      } else {
        alert("Failed to request leave.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting leave request.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not logged in or session expired.</p>;

  const leavesRemaining = (employee.totalLeaves ?? 20) - (employee.leavesTaken ?? 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Dashboard</h2>

      <div style={styles.section}>
        <h3>Employee Information</h3>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>Position:</strong> {employee.position}</p>
      </div>

      <div style={styles.section}>
        <h3>Leave Details</h3>
        <p><strong>Total Leaves:</strong> {employee.totalLeaves ?? 20}</p>
        <p><strong>Leaves Taken:</strong> {employee.leavesTaken ?? 0}</p>
        <p><strong>Leaves Remaining:</strong> {leavesRemaining}</p>
      </div>

      <div style={styles.section}>
        <h3>Request Leave</h3>
        <button
          onClick={handleLeaveRequest}
          disabled={leaveRequested}
          style={{
            ...styles.button,
            backgroundColor: leaveRequested ? "#999" : "#28a745",
            cursor: leaveRequested ? "not-allowed" : "pointer"
          }}
        >
          {leaveRequested ? "Leave Requested" : "Request Leave"}
        </button>
      </div>

      <div style={styles.section}>
        <h3>Leave History</h3>
        {leaveHistory.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <ul>
            {leaveHistory.map((leave, index) => (
              <li key={index}>
                {new Date(leave.date).toLocaleDateString()} — <strong>{leave.status}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  section: {
    marginBottom: "1.5rem",
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
