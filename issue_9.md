Title:
[Security] Predictable Order ID Generation using `Math.random()`

### Description
The `generateOrderId` function uses `Math.random()` to generate a 6-digit numeric string for new orders. `Math.random()` is not a cryptographically secure pseudo-random number generator (CSPRNG).

### Location
`backend/src/repositories/order.repository.js` (Lines 53-56)

```javascript
const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `VV-${randomNum}`;
};
```

### Why This Matters
Predictable order IDs can allow an attacker to guess valid order IDs of other users. If the application has any endpoint that allows looking up an order by its `orderId` without strong access controls, it could lead to an Insecure Direct Object Reference (IDOR) vulnerability, exposing sensitive customer information (e.g., name, address, phone number).

### Suggested Fix
Replace `Math.random()` with the built-in `crypto` module to generate a cryptographically secure random number:

```javascript
import crypto from 'crypto';

const generateOrderId = () => {
  const randomNum = crypto.randomInt(100000, 1000000);
  return `VV-${randomNum}`;
};
```

### Priority
Medium

### Labels
security, bug