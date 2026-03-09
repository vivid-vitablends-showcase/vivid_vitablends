Title:
[Bug] Unhandled Promise Rejections in Category Controller `clearCache` Calls

### Description
The `clearCache` utility in `backend/src/middleware/cache.js` is an asynchronous function that returns a Promise. However, in `backend/src/controllers/category.controller.js`, it is called without the `await` keyword inside the `updateHomepageVisibility` and `update` methods.

### Location
`backend/src/controllers/category.controller.js` (Lines 37-38, 51-52)

```javascript
    // Clear relevant caches
    clearCache('categories:all');
    clearCache('categories:homepage');
```

### Why This Matters
Calling asynchronous functions without `await` and without `.catch()` blocks can cause silent failures or unhandled promise rejection warnings in Node.js. In newer versions of Node.js, unhandled promise rejections will crash the entire process, leading to unexpected application downtime.

### Suggested Fix
Add `await` to all `clearCache` calls:

```javascript
    await clearCache('categories:all');
    await clearCache('categories:homepage');
```

### Priority
Medium

### Labels
bug, refactor