const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const router = express.Router();

// Register API
router.post("/register", async (req, res) => {

    const { name, email, password, address } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)",
            [name, email, hashedPassword, address, "USER"],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "User Registered Successfully"
                });

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

});

// Login API
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User Not Found"
                });
            }

            const validPassword = await bcrypt.compare(
                password,
                result[0].password
            );

            if (!validPassword) {
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                {
                    id: result[0].id,
                    role: result[0].role
                },
                "secret123"
            );

            res.json({
                message: "Login Successful",
                token: token,
                role: result[0].role
            });

        }
    );

});

router.put("/update-password", async (req, res) => {

    const { email, newPassword } = req.body;

    const hashedPassword =
    await bcrypt.hash(newPassword, 10);

    db.query(
        "UPDATE users SET password=? WHERE email=?",
        [hashedPassword, email],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Password Updated Successfully"
            });

        }
    );

});

module.exports = router;