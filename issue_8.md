Title:
[Performance] Rate Limiter Race Condition on Expiration Setup

### Description
The custom rate limiter uses `redisClient.get(key)` followed by `redisClient.multi().incr(key)` and conditionally sets an expiration `if (!current) { multi.pExpire(key, windowMs); }`. Because there is a gap between the `get` and the `multi.exec()`, concurrent requests could both see `current` as null.

### Location
`backend/src/middleware/rateLimiter.js` (Lines 22-30)

```javascript
      const multi = redisClient.multi();
      multi.incr(key);
      if (!current) {
        multi.pExpire(key, windowMs);
      }
      await multi.exec();
```

### Why This Matters
Under highly concurrent traffic, multiple requests will trigger `multi.pExpire(key, windowMs)`. Each concurrent call pushes the expiration further into the future. A malicious actor could theoretically bypass rate limiting by sending continuous bursts of requests, preventing the key from ever expiring and locking themselves out indefinitely, or manipulating the rate limit window duration.

### Suggested Fix
Use the native atomic commands provided by Redis for rate limiting, such as using a Redis Lua script or issuing `redisClient.set(key, 1, { NX: true, PX: windowMs })` combined with `redisClient.incr(key)`.

### Priority
Medium

### Labels
performance, security