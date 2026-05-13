const express = require("express");
const { redisClient } = require("./config/redis");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(express.json());
app.use("/api", testRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Distributed Rate Limiter Service Running"
    });
});

app.get("/redis-test", async (req, res) => {
    try {
        await redisClient.set("testKey", "Redis is working!");

        const data = await redisClient.get("testKey");

        res.json({
            success: true,
            message: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = app;