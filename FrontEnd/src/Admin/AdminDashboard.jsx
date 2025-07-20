import './AdminDashboard.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { unparse } from 'papaparse';

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [form, setForm] = useState({ name: '', email: '', position: '', department: '' });
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/admin/profile', { withCredentials: true });
      setUsername(res.data.username);
    } catch (err) {
      console.error('Error fetching admin profile:', err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/employees', { withCredentials: true });
      const updated = res.data.map(emp => ({ ...emp, isEditing: false }));
      setEmployees(updated);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error(err);
      alert("You must be logged in as an admin to view the dashboard.");
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { name, email, position, department } = form;
    if (!name || !email || !position || !department) return alert('Please fill in all fields');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Invalid email format');

    try {
      const res = await axios.post('http://localhost:3001/api/employees', form, { withCredentials: true });
      setEmployees([...employees, { ...res.data, isEditing: false }]);
      setForm({ name: '', email: '', position: '', department: '' });
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error(err);
      alert('Error adding employee');
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/employees/${id}`, { withCredentials: true });
      setEmployees(employees.filter(emp => emp._id !== id));
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSelected = async () => {
    if (!window.confirm("Delete selected employees?")) return;
    try {
      for (let id of selectedIds) {
        await axios.delete(`http://localhost:3001/api/employees/${id}`, { withCredentials: true });
      }
      fetchEmployees();
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleEdit = (index) => {
    const updated = [...employees];
    updated[index].isEditing = !updated[index].isEditing;
    setEmployees(updated);
  };

  const handleEditChange = (index, field, value) => {
    const updated = [...employees];
    updated[index][field] = value;
    setEmployees(updated);
  };

  const saveEmployee = async (index) => {
    const emp = employees[index];
    try {
      const res = await axios.put(`http://localhost:3001/api/employees/${emp._id}`, {
        name: emp.name,
        email: emp.email,
        position: emp.position,
        department: emp.department
      }, { withCredentials: true });

      const updated = [...employees];
      updated[index] = { ...res.data, isEditing: false };
      setEmployees(updated);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const exportCSV = () => {
    const csv = unparse(employees.map(({ _id, isEditing, ...emp }) => emp));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'employees.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const departmentCounts = employees.reduce((acc, emp) => {
    const dept = emp.department || 'Unknown';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(departmentCounts),
    datasets: [{
      data: Object.values(departmentCounts),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF5722'],
    }]
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h2>Welcome, Admin {username}</h2>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={exportCSV}>Export CSV</button>
        <button onClick={deleteSelected} disabled={selectedIds.length === 0}>Delete Selected</button>
      </div>

      {lastUpdated && <p className="updated-time">Last Updated: {lastUpdated}</p>}

      <form className="form-grid" onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={(e) => handleInputChange('name', e.target.value)} />
        <input placeholder="Email" value={form.email} onChange={(e) => handleInputChange('email', e.target.value)} />
        <input placeholder="Position" value={form.position} onChange={(e) => handleInputChange('position', e.target.value)} />
        <input placeholder="Department" value={form.department} onChange={(e) => handleInputChange('department', e.target.value)} />
        <button type="submit">Add Employee</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp, index) => (
            <tr key={emp._id}>
              <td><input type="checkbox" checked={selectedIds.includes(emp._id)} onChange={() => toggleSelect(emp._id)} /></td>
              <td>{emp.isEditing ? <input value={emp.name} onChange={(e) => handleEditChange(index, 'name', e.target.value)} /> : emp.name}</td>
              <td>{emp.isEditing ? <input value={emp.email} onChange={(e) => handleEditChange(index, 'email', e.target.value)} /> : emp.email}</td>
              <td>{emp.isEditing ? <input value={emp.position} onChange={(e) => handleEditChange(index, 'position', e.target.value)} /> : emp.position}</td>
              <td>{emp.isEditing ? <input value={emp.department} onChange={(e) => handleEditChange(index, 'department', e.target.value)} /> : emp.department}</td>
              <td>
                {emp.isEditing ? (
                  <>
                    <button onClick={() => saveEmployee(index)}>Save</button>{' '}
                    <button onClick={() => toggleEdit(index)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(index)}>Edit</button>{' '}
                    <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="chart-container">
        <h3>Employee Distribution by Department</h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default AdminDashboard;
