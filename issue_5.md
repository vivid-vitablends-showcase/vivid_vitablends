Title:
[Performance] Redundant Database Lookups During Order Creation Loop

### Description
In `backend/src/repositories/order.repository.js`, the `create` method runs a database transaction. During this transaction, it attempts to generate a unique `orderId` using a `while` loop that queries the database up to 5 times.

### Location
`backend/src/repositories/order.repository.js` (Lines 94-101)

```javascript
    let orderId;
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      orderId = generateOrderId();
      const existing = await tx.order.findUnique({ where: { orderId } });
      if (!existing) break;
      attempts++;
    }
```

### Why This Matters
Generating a random 6-digit ID and querying the database for its existence multiple times inside an active transaction significantly slows down order creation. This leads to higher database contention and locks under heavy traffic, severely impacting the performance of the checkout flow.

### Suggested Fix
Replace the retry logic and `findUnique` query with a highly collision-resistant identifier (such as a UUID or CUID) or append the database-generated primary key (which is a CUID) or a timestamp to the 6-digit prefix to ensure uniqueness natively without querying the database repeatedly.

### Priority
Medium

### Labels
performance, refactor