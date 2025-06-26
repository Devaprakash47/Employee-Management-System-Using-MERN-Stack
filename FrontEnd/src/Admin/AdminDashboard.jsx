import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [form, setForm] = useState({ name: '', email: '', position: '', department: '' });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      const updated = res.data.map(emp => ({ ...emp, isEditing: false }));
      setEmployees(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const submit = async () => {
    const { name, email, position, department } = form;
    if (!name || !email || !position || !department) return alert('Please fill in all fields');

    try {
      const res = await axios.post('http://localhost:5000/api/employees', form);
      setEmployees([...employees, { ...res.data, isEditing: false }]);
      setForm({ name: '', email: '', position: '', department: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
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
      const res = await axios.put(`http://localhost:5000/api/employees/${emp._id}`, {
        name: emp.name,
        email: emp.email,
        position: emp.position,
        department: emp.department
      });
      const updated = [...employees];
      updated[index] = { ...res.data, isEditing: false };
      setEmployees(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard - Manage Employees</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Position"
          value={form.position}
          onChange={(e) => handleInputChange('position', e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => handleInputChange('department', e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={submit}>Add Employee</button>
      </div>

      <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
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
    </div>
  );
}

export default AdminDashboard;
