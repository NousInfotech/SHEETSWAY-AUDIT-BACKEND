# Auditor API Documentation

## POST /api/v1/auditors/firebase-register

Registers an auditor using Firebase Authentication. This endpoint checks the Firebase token, and creates a new auditor if they do not already exist.

### Authorization

- Required: Yes
- Header: `Authorization: Bearer <Firebase ID Token>`

### Request Body

```json
{
  "firmName": "Deloitte",
  "licenseNumber": "AUD123456"
}
```

### Response Example

```json
{
  "success": true,
  "message": "Auditor registered with Firebase",
  "data": {
    "id": "clx...",
    "firebaseId": "firebase-uid",
    "email": "auditor@example.com",
    "name": "Auditor",
    "firmName": "Deloitte",
    "licenseNumber": "AUD123456"
  }
}
```

### Possible Errors

- `401 Unauthorized`: Missing or invalid Firebase token
- `400 Bad Request`: Missing required fields like firmName or licenseNumber
- `500 Internal Server Error`: Database failure or unknown error

### Notes

- This route does not require a body for Firebase fields like `email` or `name`. These are extracted from the Firebase token.
- This API ensures idempotency — if the auditor already exists, it returns the existing record.
