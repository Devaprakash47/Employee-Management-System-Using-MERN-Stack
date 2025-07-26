const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  email: String,
  password: String,
  position: String,
  salary: Number,
  dob: Date,
  joiningDate: Date,
  totalLeaves: Number,
  leavesTaken: Number,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
