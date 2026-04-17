Title:
[Bug] Incorrect destructuring of `redisClient.scan` result causes cache clearing to fail

### Description
In `backend/src/middleware/cache.js`, the `clearCache` function uses `redisClient.scan` to find keys to delete. It destructures the result as an array `[nextCursor, foundKeys]`. However, the `node-redis` package (version 4.x) returns an object with `cursor` and `keys` properties, not an array. As a result, attempting to destructure the returned object as an array will throw a `TypeError: redisClient.scan(...) is not iterable`.

### Location
`backend/src/middleware/cache.js` (Lines 46-49)

```javascript
const [nextCursor, foundKeys] = await redisClient.scan(cursor, {
  MATCH: matchPattern,
  COUNT: 100,
});
```

### Why This Matters
Whenever a category, product, or review is modified, `clearCache` is called to invalidate the cache. Since it throws an error instead, the cache is never cleared. This results in stale data being served to users for up to the TTL duration (default 1 hour), which can lead to users seeing incorrect prices, outdated product details, or deleted items on the frontend.

### Suggested Fix
Update the destructuring assignment to expect an object with `cursor` and `keys` properties:

```javascript
const { cursor: nextCursor, keys: foundKeys } = await redisClient.scan(cursor, {
  MATCH: matchPattern,
  COUNT: 100,
});
```

### Priority
High

### Labels
bug, performance