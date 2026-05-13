const tokenBucketScript = `
local bucket = redis.call('GET', KEYS[1])

local capacity = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local currentTime = tonumber(ARGV[3])

local tokens
local lastRefill

if not bucket then
    tokens = capacity
    lastRefill = currentTime
else
    local data = cjson.decode(bucket)
    tokens = data.tokens
    lastRefill = data.lastRefill
end

local elapsed = currentTime - lastRefill
local refill = elapsed * refillRate

tokens = math.min(capacity, tokens + refill)
lastRefill = currentTime

if tokens < 1 then
    redis.call(
        'SETEX',
        KEYS[1],
        60,
        cjson.encode({
            tokens = tokens,
            lastRefill = lastRefill
        })
    )
    return 0
end

tokens = tokens - 1

redis.call(
    'SETEX',
    KEYS[1],
    60,
    cjson.encode({
        tokens = tokens,
        lastRefill = lastRefill
    })
)

return 1
`;

module.exports = {
    tokenBucketScript
};