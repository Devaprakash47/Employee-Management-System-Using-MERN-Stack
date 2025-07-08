const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const Admin = require("./models/Admin");
const Employee = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"], // your frontend port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/ems", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));

// JWT Middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Token is missing" });

    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: "Invalid token" });
        if (decoded.role === "admin") {
            next();
        } else {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }
    });
};

// Admin Routes
app.post("/admin-signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await Admin.findOne({ email });
        if (existingUser) return res.json({ success: false, message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = await Admin.create({ username, email, password: hash });

        res.json({ success: true, message: "Admin registered successfully" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

app.post("/admin-signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email });
        if (!user) return res.json({ success: false, message: "No record found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ success: false, message: "Incorrect password" });

        const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true });
        res.json({ success: true, message: "Login successful", role: user.role });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

app.get("/admin-dashboard", verifyUser, (req, res) => {
    res.json({ success: true, message: "Welcome to admin dashboard" });
});

// ✅ Employee API routes
app.get("/api/employees", verifyUser, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/api/employees", verifyUser, async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put("/api/employees/:id", verifyUser, async (req, res) => {
    try {
        const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete("/api/employees/:id", verifyUser, async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
