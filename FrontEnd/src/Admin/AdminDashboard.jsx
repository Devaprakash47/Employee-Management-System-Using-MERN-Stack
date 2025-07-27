import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    joiningDate: "",
    salary: "",
    position: "",
    totalLeave: "",
    takenLeave: "",
  });

  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/api/employees", {
        withCredentials: true,
      });
      setEmployees(res.data.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      alert("Session expired or unauthorized.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/admin/leave-requests", {
        withCredentials: true,
      });
      setLeaveRequests(res.data.data || []);
    } catch (err) {
      console.error("Error fetching leave requests:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchLeaveRequests();
  }, []);

  const handleLeaveAction = async (employeeId, index, action) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/admin/leave-requests/${employeeId}/${index}/${action}`,
        {},
        { withCredentials: true }
      );
      alert(res.data.message);
      fetchEmployees();
      fetchLeaveRequests();
    } catch (err) {
      console.error("Leave action failed:", err);
      alert("Failed to process leave request.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateEmployee = async () => {
    const isFormFilled =
      employeeData.employeeId &&
      employeeData.name &&
      employeeData.email &&
      employeeData.dob &&
      employeeData.joiningDate &&
      employeeData.salary &&
      employeeData.position &&
      employeeData.totalLeave &&
      employeeData.takenLeave;

    if (!isFormFilled) return alert("Please fill out all required fields.");

    try {
      if (editingEmployeeId) {
        const updatedData = { ...employeeData };
        if (!updatedData.password) delete updatedData.password;

        await axios.put(
          `http://localhost:3001/api/employees/${editingEmployeeId}`,
          updatedData,
          { withCredentials: true }
        );
        alert("Employee updated.");
      } else {
        if (!employeeData.password) return alert("Password is required.");
        await axios.post("http://localhost:3001/api/employees", employeeData, {
          withCredentials: true,
        });
        alert("Employee added.");
      }

      fetchEmployees();
      resetForm();
    } catch (err) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || "Failed to save employee.");
    }
  };

  const resetForm = () => {
    setEmployeeData({
      employeeId: "",
      name: "",
      email: "",
      password: "",
      dob: "",
      joiningDate: "",
      salary: "",
      position: "",
      totalLeave: "",
      takenLeave: "",
    });
    setEditingEmployeeId(null);
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/employees/${id}`, {
        withCredentials: true,
      });
      fetchEmployees();
      resetForm();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete employee.");
    }
  };

  const handleEditEmployee = (emp) => {
    setEmployeeData({
      employeeId: emp.employeeId || "",
      name: emp.name,
      email: emp.email,
      password: "",
      dob: emp.dob,
      joiningDate: emp.joiningDate,
      salary: emp.salary,
      position: emp.position,
      totalLeave: emp.totalLeave || "",
      takenLeave: emp.takenLeave || "",
    });
    setEditingEmployeeId(emp._id);
  };

  const handleSearch = () => {
    const filtered = employees.filter((emp) =>
      emp.employeeId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.salary.toString().includes(searchQuery.toLowerCase()) ||
      emp.dob.includes(searchQuery)
    );
    setSearchResults(filtered);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  };

  const displayEmployees = isSearching ? searchResults : employees;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search by name, email, position, ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        {isSearching && <button onClick={handleClearSearch} className="clear-button">Clear</button>}
      </div>

      {/* EMPLOYEE FORM */}
      <div className="form-grid">
        <label>Employee ID:
          <input type="text" name="employeeId" value={employeeData.employeeId} onChange={handleChange} />
        </label>
        <label>Name:
          <input type="text" name="name" value={employeeData.name} onChange={handleChange} />
        </label>
        <label>Email:
          <input type="email" name="email" value={employeeData.email} onChange={handleChange} />
        </label>
        <label>Password:
          <input type="password" name="password" placeholder={editingEmployeeId ? "Leave blank to keep existing" : ""} value={employeeData.password} onChange={handleChange} />
        </label>
        <label>DOB:
          <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} />
        </label>
        <label>Joining Date:
          <input type="date" name="joiningDate" value={employeeData.joiningDate} onChange={handleChange} />
        </label>
        <label>Salary:
          <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} />
        </label>
        <label>Position:
          <input type="text" name="position" value={employeeData.position} onChange={handleChange} />
        </label>
        <label>Total Leave:
          <input type="number" name="totalLeave" value={employeeData.totalLeaves} onChange={handleChange} />
        </label>
        <label>Taken Leave:
          <input type="number" name="takenLeave" value={employeeData.leavesTaken} onChange={handleChange} />
        </label>

        <button className="add-button" onClick={handleAddOrUpdateEmployee}>
          {editingEmployeeId ? "Update Employee" : "+ Add Employee"}
        </button>
      </div>

      {/* EMPLOYEE TABLE */}
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <>
          {isSearching && (
            <p>Showing search results for: <strong>{searchQuery}</strong></p>
          )}
          <table>
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Joining</th>
                <th>Salary</th>
                <th>Position</th>
                <th>Total Leave</th>
                <th>Taken Leave</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayEmployees.length > 0 ? displayEmployees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employeeId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.joiningDate}</td>
                  <td>₹{emp.salary}</td>
                  <td>{emp.position}</td>
                  <td>{emp.totalLeaves}</td>
                  <td>{emp.leavesTaken}</td>
                 <td>
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <button
      onClick={() => handleEditEmployee(emp)}
      style={{ background: "#1890ff", color: "white", padding: "6px", border: "none", borderRadius: "4px" }}
    >
      Edit
    </button>
    <button
      onClick={() => handleDeleteEmployee(emp._id)}
      style={{ background: "#ff4d4f", color: "white", padding: "6px", border: "none", borderRadius: "4px" }}
    >
      Delete
    </button>
  </div>
</td>

                </tr>
              )) : (
                <tr><td colSpan="10">No employees found.</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/* LEAVE REQUESTS */}
      <h3>Pending Leave Requests</h3>
      {leaveRequests.length === 0 ? (
        <p>No pending leave requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Leave Index</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((emp) =>
              emp.leaveRequests
                .map((lr, idx) => ({ ...lr, index: idx }))
                .filter((lr) => lr.status === "Pending")
                .map((lr) => (
                  <tr key={`${emp._id}-${lr.index}`}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{lr.index}</td>
                    <td>{lr.status}</td>
                    <td>
                      <button onClick={() => handleLeaveAction(emp._id, lr.index, "approve")}>✅ Approve</button>
                      <button onClick={() => handleLeaveAction(emp._id, lr.index, "reject")}>❌ Reject</button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
