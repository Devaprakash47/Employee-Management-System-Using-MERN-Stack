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
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/ems");


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("Token is missing");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json("Error with token");
            if (decoded.role === "admin") {
                next();
            } else {
                return res.json("Not admin");
            }
        });
    }
};

app.get("/dashboard", verifyUser, (req, res) => {
    res.json("Success");
});


app.post("/admin", async (req, res) => {
    const { username, email, password }=req.body;
     console.log(username,email,password);
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ username, email, password: hash });
        res.json("Success");
    } catch (err) {
        res.json(err);
    }
});


app.post("/admin-signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) return res.json("No record existed");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json("The password is incorrect");

        const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true });
        res.json({ Status: "Success", role: user.role });
    } catch (err) {
        res.json(err);
    }
});

app.listen(3001, () => {
    console.log("Server is Running on http://localhost:3001");
});
