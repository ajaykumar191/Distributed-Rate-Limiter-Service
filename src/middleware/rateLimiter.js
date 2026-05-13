const tokenBucket = require("../services/tokenBucket");

const rateLimiter =
    (capacity = 5, refillRate = 1) =>
    async (req, res, next) => {
        try {
            const ipAddress =
                req.headers["x-forwarded-for"] ||
                req.socket.remoteAddress;

            const allowed =
                await tokenBucket(
                    ipAddress,
                    capacity,
                    refillRate
                );

            // Response headers
            res.setHeader(
                "X-RateLimit-Limit",
                capacity
            );

            if (!allowed) {
                return res.status(429).json({
                    success: false,
                    message:
                        "Too many requests. Please try again later."
                });
            }

            next();
        } catch (error) {
            console.error(
                "Rate Limiter Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Internal Server Error"
            });
        }
    };

module.exports = rateLimiter;