const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const verifyToken = require("../middleware/verifyToken");

// GET current logged-in employee
router.get("/me", verifyToken, async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.user.id }).select("-password");
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
// Leave request route
router.post("/request-leave", authenticateEmployee, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    employee.leaveRequests = employee.leaveRequests || [];
    employee.leaveRequests.push({ date: new Date(), status: "Pending" });

    await employee.save();

    res.json({ success: true, message: "Leave request submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
