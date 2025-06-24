import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  const [employees, setEmployees] = useState([]);

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      // Add isEditing to each employee for local editing
      const updated = res.data.map(emp => ({ ...emp, isEditing: false }));
      setEmployees(updated);
    } catch (err) {
      console.error(err);
    }
  };

  // Create new employee
  const submit = async () => {
    try {
      const newEmp = { name, email, position, department };
      const res = await axios.post('http://localhost:5000/api/employees', newEmp);
      setEmployees([...employees, { ...res.data, isEditing: false }]);
      setName('');
      setEmail('');
      setPosition('');
      setDepartment('');
    } catch (err) {
      console.error(err);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle edit
  const toggleEdit = (index) => {
    const newData = [...employees];
    newData[index].isEditing = !newData[index].isEditing;
    setEmployees(newData);
  };

  // Handle field change in editing
  const handleEditChange = (index, field, value) => {
    const newData = [...employees];
    newData[index][field] = value;
    setEmployees(newData);
  };

  // Save updated employee
  const saveEmployee = async (index) => {
    try {
      const emp = employees[index];
      const { _id, name, email, position, department } = emp;
      const res = await axios.put(`http://localhost:5000/api/employees/${_id}`, {
        name, email, position, department
      });
      const newData = [...employees];
      newData[index] = { ...res.data, isEditing: false };
      setEmployees(newData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard - Employee CRUD</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={submit}>Add Employee</button>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id}>
              <td>
                {emp.isEditing ? (
                  <input
                    value={emp.name}
                    onChange={(e) => handleEditChange(index, 'name', e.target.value)}
                  />
                ) : (
                  emp.name
                )}
              </td>
              <td>
                {emp.isEditing ? (
                  <input
                    value={emp.email}
                    onChange={(e) => handleEditChange(index, 'email', e.target.value)}
                  />
                ) : (
                  emp.email
                )}
              </td>
              <td>
                {emp.isEditing ? (
                  <input
                    value={emp.position}
                    onChange={(e) => handleEditChange(index, 'position', e.target.value)}
                  />
                ) : (
                  emp.position
                )}
              </td>
              <td>
                {emp.isEditing ? (
                  <input
                    value={emp.department}
                    onChange={(e) => handleEditChange(index, 'department', e.target.value)}
                  />
                ) : (
                  emp.department
                )}
              </td>
              <td>
                {emp.isEditing ? (
                  <button onClick={() => saveEmployee(index)}>Save</button>
                ) : (
                  <button onClick={() => toggleEdit(index)}>Edit</button>
                )}
                <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
