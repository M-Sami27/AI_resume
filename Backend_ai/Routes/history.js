const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const historyPath = path.join(
    __dirname,
    "../data/history.json"
);


// ✅ GET ALL USER HISTORY (SAFE VERSION)
router.get("/all/:user", (req, res) => {

    try {

        const user = req.params.user;

        const data = JSON.parse(
            fs.readFileSync(historyPath, "utf-8")
        );

        console.log("Requested user:", user); // DEBUG

        // ⚠️ SAFE FILTER (trim avoids space issues)
        const filtered = data.filter(item =>
            (item.user || "").trim() === user.trim()
        );

        res.json(filtered);

    } catch (err) {

        res.status(500).json({
            message: "History fetch failed",
            error: err.message
        });

    }
});

module.exports = router;