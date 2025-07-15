// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  dob: { type: String, required: true }, // Format: YYYY-MM-DD
  position: String,
  department: String,
  // any other fields
});

module.exports = mongoose.model("Employee", employeeSchema);
