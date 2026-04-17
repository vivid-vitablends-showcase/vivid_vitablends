Title:
[Security] CSRF Vulnerability on Admin Token Refresh Endpoint

### Description
In `backend/src/config/index.js`, the `sameSite` configuration for cookies is set to `'none'` when `NODE_ENV === 'production'`. Combined with `credentials: "include"` and `POST` requests, this allows cookies to be sent cross-origin. The `/api/admin/refresh` endpoint in `backend/src/controllers/admin.controller.js` reads the refresh token from `req.cookies` and uses it to issue a new access token and rotate the refresh token. Because the endpoint uses POST and does not validate any CSRF token (relying solely on the cookie), an attacker can perform a Cross-Site Request Forgery (CSRF) attack against a logged-in admin.

### Location
`backend/src/controllers/admin.controller.js` (Lines 37-41)
`backend/src/utils/request.js` (Lines 11-16)

### Why This Matters
While the attacker cannot read the new tokens from the response (due to CORS policies), triggering a refresh will cause the backend to rotate the refresh token and invalidate the old one. This leads to a Denial of Service (DoS) for the legitimate admin user, effectively logging them out of their active session without their consent.

### Suggested Fix
If the frontend and backend are served on the same domain or subdomain, change `sameSite` to `'lax'` or `'strict'` in production. If cross-domain requests are strictly required, implement a CSRF protection mechanism (e.g., using a CSRF token passed in headers) for the `/api/admin/refresh` endpoint.

### Priority
Medium

### Labels
security, bug