const { redisClient } = require("../config/redis");
const {
    tokenBucketScript
} = require("../utils/redisScripts");

const tokenBucket = async (
    ipAddress,
    capacity,
    refillRate
) => {
    const key = `rate_limit:${ipAddress}`;

    const currentTime = Math.floor(
        Date.now() / 1000
    );

    const allowed =
        await redisClient.eval(
            tokenBucketScript,
            {
                keys: [String(key)],
                arguments: [
                    String(capacity),
                    String(refillRate),
                    String(currentTime)
                ]
            }
        );

    return allowed === 1;
};

module.exports = tokenBucket;