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

mongoose.connect("mongodb://127.0.0.1:27017/ems", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('strictQuery', true);

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });

    req.user = decoded; 
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  });
};

app.post("/admin-signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role: "admin"
    });

    res.json({ success: true, message: "Admin registered" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
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
      {
        id: admin._id,
        email: admin.email,
        username: admin.username,
        role: admin.role
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
    });

    res.json({ success: true, message: "Login successful", role: admin.role, username: admin.username });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.get("/api/admin/profile", verifyUser, async (req, res) => {
  try {
    const { username, email } = req.user;
    res.json({ success: true, username, email });
  } catch (err) {
    res.status(500).json({ success: false, message: "Could not fetch profile" });
  }
});

app.get("/admin-dashboard", verifyUser, (req, res) => {
  res.json({ success: true, message: "Welcome to admin dashboard" });
});

app.get("/api/employees", verifyUser, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/employees", verifyUser, async (req, res) => {
  try {
    const newEmp = await Employee.create(req.body);
    res.status(201).json({ success: true, data: newEmp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.put("/api/employees/:id", verifyUser, async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.delete("/api/employees/:id", verifyUser, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
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

mongoose.connect("mongodb://127.0.0.1:27017/ems", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('strictQuery', true);

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });

    req.user = decoded; 
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  });
};

app.post("/admin-signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role: "admin"
    });

    res.json({ success: true, message: "Admin registered" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
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
      {
        id: admin._id,
        email: admin.email,
        username: admin.username,
        role: admin.role
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
    });

    res.json({ success: true, message: "Login successful", role: admin.role, username: admin.username });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.get("/api/admin/profile", verifyUser, async (req, res) => {
  try {
    const { username, email } = req.user;
    res.json({ success: true, username, email });
  } catch (err) {
    res.status(500).json({ success: false, message: "Could not fetch profile" });
  }
});

app.get("/admin-dashboard", verifyUser, (req, res) => {
  res.json({ success: true, message: "Welcome to admin dashboard" });
});

app.get("/api/employees", verifyUser, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/employees", verifyUser, async (req, res) => {
  try {
    const newEmp = await Employee.create(req.body);
    res.status(201).json({ success: true, data: newEmp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.put("/api/employees/:id", verifyUser, async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.delete("/api/employees/:id", verifyUser, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});