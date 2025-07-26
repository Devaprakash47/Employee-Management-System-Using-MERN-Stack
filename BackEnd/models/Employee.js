// models/Employee.js
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
  totalLeaves: {
    type: Number,
    default: 20,
  },
  leavesTaken: {
    type: Number,
    default: 0,
  },
  leaveRequests: [
    {
      date: { type: Date, default: Date.now },
      status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    }
  ]
});

module.exports = mongoose.model("Employee", EmployeeSchema);
