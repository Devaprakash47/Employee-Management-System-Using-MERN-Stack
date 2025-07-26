const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const Admin = require("./models/Admin");
const Employee = require("./models/Employee");

const app = express();
const PORT = 3001;
const JWT_SECRET = "jwt-secret-key";

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ems", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", true);
mongoose.connection.on("connected", () => console.log("✅ MongoDB connected"));
mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Role verification middleware
const verifyRole = (role) => (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== role)
      return res.status(403).json({ success: false, message: "Access denied" });
    req.user = decoded;
    next();
  });
};

//////////////////////////////////////////////////
// 🧑‍💼 ADMIN AUTH ROUTES
//////////////////////////////////////////////////
app.post("/admin-signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.json({ success: false, message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ username, email, password: hashedPassword, role: "admin" });

    res.json({ success: true, message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Signup failed", error: err.message });
  }
});

app.post("/admin-signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.json({ success: false, message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.json({ success: false, message: "Wrong password" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "Lax" });

    res.json({ success: true, message: "Login successful", role: admin.role, username: admin.username });
  } catch (err) {
    res.status(500).json({ success: false, message: "Signin failed", error: err.message });
  }
});

app.get("/api/admin/profile", verifyRole("admin"), (req, res) => {
  const { username, email } = req.user;
  res.json({ success: true, username, email });
});

//////////////////////////////////////////////////
// 🧑‍💻 EMPLOYEE AUTH ROUTES
//////////////////////////////////////////////////
app.post("/employee-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) return res.json({ success: false, message: "Employee not found" });

    // ⚠️ Plain password check (NOT recommended for prod)
    if (employee.password !== password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const role = employee.role || "employee"; // ✅ Default role

    const token = jwt.sign(
      { id: employee._id, email: employee.email, name: employee.name, role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "Lax" });

    res.json({
      success: true,
      message: "Login successful",
      role,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        position: employee.position,
        employeeId: employee.employeeId
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
});

app.get("/api/employee/profile", verifyRole("employee"), async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select("-password");
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    res.json({ success: true, employee });
  } catch (err) {
    res.status(500).json({ success: false, message: "Profile fetch failed", error: err.message });
  }
});

//////////////////////////////////////////////////
// 👩‍💻 EMPLOYEE CRUD ROUTES (ADMIN ONLY)
//////////////////////////////////////////////////
app.get("/api/employees", verifyRole("admin"), async (req, res) => {
  try {
    const employees = await Employee.find().select("-password");
    res.json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/employees", verifyRole("admin"), async (req, res) => {
  try {
    const newEmp = await Employee.create({
      ...req.body,
      role: "employee" // ✅ Ensure the role is set
    });
    res.status(201).json({ success: true, data: newEmp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.put("/api/employees/:id", verifyRole("admin"), async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.delete("/api/employees/:id", verifyRole("admin"), async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

//////////////////////////////////////////////////
// 🚀 START SERVER
//////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
const handleLeaveRequest = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/employee/request-leave",
      {},
      { withCredentials: true }
    );
    if (res.data.success) {
      setLeaveRequested(true);
      alert("Leave request submitted!");
    } else {
      alert("Failed to request leave.");
    }
  } catch (error) {
    console.error(error);
    alert("Error submitting leave request.");
  }
};
//////////////////////////////////////////////////
// ✋ EMPLOYEE LEAVE REQUEST (EMPLOYEE)
//////////////////////////////////////////////////
app.post("/api/employee/request-leave", verifyRole("employee"), async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    employee.leaveRequests.push({ status: "Pending" });
    await employee.save();

    res.json({ success: true, message: "Leave requested" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

//////////////////////////////////////////////////
// 📥 GET PENDING LEAVE REQUESTS (ADMIN)
//////////////////////////////////////////////////
app.get("/api/admin/leave-requests", verifyRole("admin"), async (req, res) => {
  try {
    const employees = await Employee.find({ "leaveRequests.status": "Pending" }).select("-password");
    res.json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//////////////////////////////////////////////////
// ✅ APPROVE / ❌ REJECT LEAVE (ADMIN)
//////////////////////////////////////////////////
app.post("/api/admin/leave-requests/:employeeId/:index/:action", verifyRole("admin"), async (req, res) => {
  const { employeeId, index, action } = req.params;

  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ success: false, message: "Invalid action" });
  }

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    const leaveIndex = parseInt(index);
    const leave = employee.leaveRequests[leaveIndex];

    if (!leave || leave.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Invalid or already processed request" });
    }

    // Update leave request status
    leave.status = action === "approve" ? "Approved" : "Rejected";

    // Increment leavesTaken only if approved
    if (action === "approve") {
      employee.leavesTaken = (employee.leavesTaken || 0) + 1;
    }

    await employee.save();
    res.json({ success: true, message: `Leave ${action}d successfully.` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});
