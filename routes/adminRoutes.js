const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/stats", (req, res) => {

    db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err, userResult) => {

            db.query(
                "SELECT COUNT(*) AS totalStores FROM stores",
                (err, storeResult) => {

                    db.query(
                        "SELECT COUNT(*) AS totalRatings FROM ratings",
                        (err, ratingResult) => {

                            res.json({
                                totalUsers: userResult[0].totalUsers,
                                totalStores: storeResult[0].totalStores,
                                totalRatings: ratingResult[0].totalRatings
                            });

                        }
                    );

                }
            );

        }
    );

});

// ADD STORE API
router.post("/addStore", (req, res) => {

    const {
        name,
        email,
        address,
        owner_id
    } = req.body;

    db.query(
        "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)",
        [name, email, address, owner_id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Store Added Successfully"
            });

        }
    );

});

// VIEW ALL STORES
router.get("/stores", (req, res) => {

    const sql = `
    SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        AVG(ratings.rating) AS rating
    FROM stores
    LEFT JOIN ratings
    ON stores.id = ratings.store_id
    GROUP BY stores.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// VIEW ALL USERS
router.get("/users", (req, res) => {

    db.query(
        "SELECT id,name,email,address,role FROM users",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});

module.exports = router;