const express = require("express");
const rateLimiter =
    require("../middleware/rateLimiter");

const router = express.Router();

router.get(
    "/test",
    rateLimiter(5, 1),
    (req, res) => {
        res.json({
            success: true,
            message:
                "API request successful"
        });
    }
);

router.get(
    "/strict",
    rateLimiter(2, 1),
    (req, res) => {
        res.json({
            success: true,
            message:
                "Strict API accessed"
        });
    }
);

module.exports = router;