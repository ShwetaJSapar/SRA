const ownerRoutes = require("./routes/ownerRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const storeRoutes = require("./routes/storeRoutes");
const auth = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const db = require("./config/db");
const express = require("express");


const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/owner", ownerRoutes);

app.get("/", (req, res) => {
    res.send("Server is Running");
});

// Protected Route
app.get("/dashboard", auth, (req, res) => {
    res.json({
        message: "Welcome Dashboard",
        user: req.user
    });
});

app.listen(5000, () => {
    console.log("Server Started on Port 5000");
});
