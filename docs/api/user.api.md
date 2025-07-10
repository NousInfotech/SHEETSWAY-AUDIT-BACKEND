# User API

## Overview
This API supports both authenticated self-lookup (using the Bearer token) and explicit param-based lookup (using `:userId` in the URL). For details on the backend structure and best practices, see [role-guide.api.md](./role-guide.api.md).

---

## Create User

- **URL:** `/users`
- **Method:** `POST`
- **Auth:** None
- **Body:**
```json
{
  "firebaseId": "KxdWbcn4cLbfn3UjKexfAAHNwGq2",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER"
}
```
- **Note:**
  - The `role` field (e.g., `"USER"`) is required and must be provided by the frontend.
- **Success Response:**
  - **Code:** 201
  - **Body:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "id": "...",
    "firebaseId": "KxdWbcn4cLbfn3UjKexfAAHNwGq2",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Auth:** Bearer Firebase Token
- **Query Parameters:**
  - `limit` (number, optional)
  - `page` (number, optional)
  - Any user field (e.g., `name=Ali Akram`)
  - `email` (string, optional, filters via Auth table)
  - `search.text` and `search.field` (for prefix search, see below)

### Search Examples
- `/users?name=Ali Akram&limit=5&page=1` — filter by name
- `/users?email=aliakram9789@gmail.com` — filter by email (via Auth)
- `/users?search.text=a&search.field=email` — prefix search on email (via Auth)
- `/users?search.text=a&search.field=name` — prefix search on name

- **Success Response:**
  - **Code:** 200
  - **Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users fetched successfully",
  "data": {
    "users": [
      {
        "id": "...",
        "authId": "...",
        "name": "...",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ],
    "total": 1
  }
}
```

---

## Get User by ID (Self or Param)

- **URL:** `/users/:userId`
- **Method:** `GET`
- **Auth:** Bearer Firebase Token (for self-lookup) or admin privileges (for param lookup)
- **How it works:**
  - If a valid Bearer token is provided, the API will return the user profile for the authenticated user (`req.userId`).
  - If `:userId` param is provided and the token is admin or has permission, the API will return the profile for that userId.
  - If both are present, the token takes precedence.
- **Params:**
  - `userId` (string, required if not using token)
- **Success Response:**
  - **Code:** 200
  - **Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User fetched successfully",
  "data": {
    "id": "...",
    "authId": "...",
    "name": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## Update User

- **URL:** `/users/:userId`
- **Method:** `PUT`
- **Auth:** Bearer Firebase Token (for self-update) or admin privileges (for param update)
- **How it works:**
  - If a valid Bearer token is provided, the API will update the profile for the authenticated user (`req.userId`).
  - If `:userId` param is provided and the token is admin or has permission, the API will update the profile for that userId.
  - If both are present, the token takes precedence.
- **Params:**
  - `userId` (string, required if not using token)
- **Body:**
```json
{
  "name": "New Name"
}
```
- **Success Response:**
  - **Code:** 200
  - **Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User updated successfully",
  "data": {
    "id": "...",
    "authId": "...",
    "name": "New Name",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## Delete User

- **URL:** `/users/:userId`
- **Method:** `DELETE`
- **Auth:** Bearer Firebase Token (for self-delete) or admin privileges (for param delete)
- **How it works:**
  - If a valid Bearer token is provided, the API will delete the profile for the authenticated user (`req.userId`).
  - If `:userId` param is provided and the token is admin or has permission, the API will delete the profile for that userId.
  - If both are present, the token takes precedence.
- **Params:**
  - `userId` (string, required if not using token)
- **Success Response:**
  - **Code:** 200
  - **Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User deleted successfully",
  "data": {
    "id": "...",
    "authId": "...",
    "name": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

**Note:**
- The `role` field is required when creating a user and must be provided by the frontend.
- Email search and filtering is always performed via the Auth table, not directly on the User model.
- For more on the backend pattern, see [role-guide.api.md](./role-guide.api.md). 