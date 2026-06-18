const express = require("express");
const db = require("../config/db");

const router = express.Router();

// ⭐ ADD RATING
router.post("/add", (req, res) => {

    const { user_id, store_id, rating } = req.body;

    console.log(req.body); // ⭐ ADD THIS LINE (VERY IMPORTANT)

    const sql = `
        INSERT INTO ratings(user_id, store_id, rating)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [user_id, store_id, rating], (err, result) => {

        if (err) {
            console.log(err); // ⭐ IMPORTANT
            return res.status(500).json(err);
        }

        res.json({
            message: "Rating Added Successfully"
        });

    });

});

// ⭐ UPDATE RATING
router.put("/update", (req, res) => {

    const { user_id, store_id, rating } = req.body;

    const sql = `
        UPDATE ratings
        SET rating = ?
        WHERE user_id = ? AND store_id = ?
    `;

    db.query(sql, [rating, user_id, store_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Rating Updated Successfully"
        });

    });

});

module.exports = router;