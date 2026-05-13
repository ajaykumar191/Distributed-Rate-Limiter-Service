require("dotenv").config();

const app = require("./app");
const { connectRedis } = require("./config/redis");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
    }
};

startServer();