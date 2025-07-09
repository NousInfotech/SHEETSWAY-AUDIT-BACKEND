# 📄 Request API Documentation

This module handles storing and managing client requests (proposals) made by users.

---

## 🔁 Common Notes

- All routes prefixed with: `/api/v1/requests`
- For now, `userId` is sent manually in the body
- Once auth middleware is integrated, `userId` will come from token

---

## 📌 Routes Overview

| Method | Endpoint                      | Description                     |
|--------|-------------------------------|---------------------------------|
| POST   | `/`                           | Create a new request            |
| GET    | `/`                           | Get all requests                |
| GET    | `/array`                      | Get simplified array of requests |
| PUT    | `/:id`                        | Update a request                |
| DELETE | `/:id`                        | Delete a request                |
| PATCH  | `/:id/status`                | Update only the status          |

---

## 📝 1. Create a Request

**POST** `/api/v1/requests`

```json
{
  "userId": "uuid-of-user",
  "title": "Build my portfolio site",
  "description": "Need a sleek React-based site",
  "status": "pending"
}
