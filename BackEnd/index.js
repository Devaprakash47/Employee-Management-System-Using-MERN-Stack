const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/Admin");

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],  // Make sure this matches your frontend
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/ems", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));


// Middleware to verify JWT
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Token is missing" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.status(401).json({ success: false, message: "Invalid token" });
            if (decoded.role === "admin") {
                next();
            } else {
                return res.status(403).json({ success: false, message: "Not authorized" });
            }
        });
    }
};

// Protected route
app.get("/dashboard", verifyUser, (req, res) => {
    res.json({ success: true, message: "Welcome to admin dashboard" });
});


app.post("/admin-signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ username, email, password: hash });

        res.json({ success: true, message: "Admin registered successfully" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});


app.post("/admin-signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "No record found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true });
        res.json({ success: true, message: "Login successful", role: user.role });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});


// Start server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
