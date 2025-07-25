// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true }, // no select:false
  dob: String,
  joiningDate: String,
  salary: String,
  position: String,
});

module.exports = mongoose.model('Employee', employeeSchema);
