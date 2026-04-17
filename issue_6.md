Title:
[Security] Missing Input Sanitization in Messages Endpoint

### Description
In `backend/src/schemas/message.schema.js`, the validation schema checks string lengths for the `name` and `message` fields but does not explicitly sanitize the input to prevent HTML or script tag injection.

### Location
`backend/src/schemas/message.schema.js` (Lines 4-10)

### Why This Matters
If the admin dashboard later renders these messages insecurely without properly escaping HTML entities (for example, via `dangerouslySetInnerHTML` in React or within email templates), an attacker could submit a payload that executes malicious JavaScript (Stored Cross-Site Scripting - XSS), potentially leading to session hijacking of the admin account.

### Suggested Fix
Add strict validation rules to disallow `<` and `>` characters using Zod's `.regex()`, or use a sanitization library like `dompurify` to clean the message input on the backend before storing it in the database.

### Priority
Medium

### Labels
security, refactor