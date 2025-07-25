const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true }, // Unique Employee ID
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  dob: { type: String, required: true },
  joiningDate: { type: String, required: true },
  salary: { type: String, required: true },
  position: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
