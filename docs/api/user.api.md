# User API

## Create User

- **URL:** `/users`
- **Method:** `POST`
- **Auth:** None
- **Body:**
```json
{
  "firebaseId": "KxdWbcn4cLbfn3UjKexfAAHNwGq2",
  "email": "user@example.com",
  "name": "John Doe"
}
```
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
- **Success Response:**
  - **Code:** 200
  - **Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users fetched successfully",
  "data": [
    {
      "id": "...",
      "firebaseId": "...",
      "email": "...",
      "name": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

## Get User by ID

- **URL:** `/users/:userId`
- **Method:** `GET`
- **Auth:** Bearer Firebase Token
- **Params:**
  - `userId` (string, required)
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
    "firebaseId": "...",
    "email": "...",
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
- **Auth:** Bearer Firebase Token
- **Params:**
  - `userId` (string, required)
- **Body:**
```json
{
  "email": "newemail@example.com",
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
    "firebaseId": "...",
    "email": "newemail@example.com",
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
- **Auth:** Bearer Firebase Token
- **Params:**
  - `userId` (string, required)
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
    "firebaseId": "...",
    "email": "...",
    "name": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
``` 