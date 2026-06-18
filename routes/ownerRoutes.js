const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/rating/:ownerId", (req, res) => {

    const ownerId = req.params.ownerId;

    const sql = `
    SELECT
    stores.name,
    AVG(ratings.rating) AS averageRating
    FROM stores
    LEFT JOIN ratings
    ON stores.id = ratings.store_id
    WHERE stores.owner_id = ?
    GROUP BY stores.id
    `;

    db.query(sql, [ownerId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


// ADD THIS NEW ROUTE HERE
router.get("/ratings/:ownerId", (req, res) => {

    const ownerId = req.params.ownerId;

    const sql = `
    SELECT
    users.name,
    users.email,
    ratings.rating
    FROM ratings
    JOIN users ON ratings.user_id = users.id
    JOIN stores ON ratings.store_id = stores.id
    WHERE stores.owner_id = ?
    `;

    db.query(sql, [ownerId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


module.exports = router;