const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

    const sql = `
    SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        AVG(ratings.rating) AS avgRating
    FROM stores
    LEFT JOIN ratings
    ON stores.id = ratings.store_id
    GROUP BY stores.id
    `;

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);
    });

});

router.get("/search", (req, res) => {

    const name = req.query.name;

    db.query(
        "SELECT * FROM stores WHERE name LIKE ?",
        [`%${name}%`],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});

router.get("/search-address", (req, res) => {

    const address = req.query.address;

    db.query(
        "SELECT * FROM stores WHERE address LIKE ?",
        [`%${address}%`],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});

module.exports = router;