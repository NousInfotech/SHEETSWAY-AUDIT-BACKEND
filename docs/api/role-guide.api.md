# Role API Developer Guide

This guide outlines the recommended structure and best practices for implementing role-related APIs in the Sheetsway Audit Marketplace backend. Follow this pattern to ensure consistency, maintainability, and scalability across all role-based modules.

---

## 1. Repository Layer (`src/infrastructure/db/repositories/`)
- **Purpose:** Direct database access using Prisma.
- **Pattern:**
  - Expose CRUD and custom query methods for each role (e.g., `auditor.repository.ts`, `admin.repository.ts`).
  - Support dynamic filters, pagination, and special handling for related models (e.g., email via Auth).
- **Example:**
  ```ts
  // auditor.repository.ts
  export const auditorRepository = {
    async getAllAuditorsPaginated({ filters, limit, page, authIds }) { /* ... */ },
    // ...other methods
  };
  ```

## 2. Use Case Layer (`src/application/use-cases/`)
- **Purpose:** Business logic and orchestration.
- **Pattern:**
  - Accept raw query params from the controller.
  - Handle mutually exclusive search modes (fieldName vs. search).
  - For email, query the Auth table and map to the role profile via `authId`.
  - For other fields, filter directly on the role model.
- **Example:**
  ```ts
  // auditor.use-case.ts
  getAllAuditorsPaginated: async (query) => { /* ... */ }
  ```

## 3. Controller Layer (`src/presentation/controllers/`)
- **Purpose:** HTTP request handling and validation.
- **Pattern:**
  - Pass `req.query` directly to the use case for abstraction.
  - Handle response formatting and error handling.
- **Example:**
  ```ts
  // AuditorController
  async getAllAuditors(req, res) {
    const result = await auditorUseCases.getAllAuditorsPaginated(req.query);
    // ...send response
  }
  ```

## 4. Routes Layer (`src/presentation/routes/`)
- **Purpose:** Express route definitions.
- **Pattern:**
  - Define public and protected routes.
  - Attach controllers and middleware (e.g., `authMiddleware`).
- **Example:**
  ```ts
  // auditor.routes.ts
  router.get('/', authMiddleware, AuditorController.getAllAuditors);
  ```

## 5. Middleware Layer (`src/middleware/`)
- **Purpose:** Authentication and role resolution.
- **Pattern:**
  - Use Firebase Admin SDK to verify tokens.
  - Resolve role and profile from Auth/RoleMap/RoleModel.
  - Attach role/profile info to `req` (e.g., `req.auditor`).
- **Example:**
  ```ts
  // authMiddleware
  // ...attaches req.auditor, req.authRole, etc.
  ```

## 6. App Initialization (`src/app.ts`, `src/index.ts`)
- **Purpose:** App setup and router mounting.
- **Pattern:**
  - Import and mount routers under a versioned API path (e.g., `/api/v1/auditors`).
  - Apply global middleware and error handling.

---

## Best Practices
- **Keep business logic in use cases, not controllers.**
- **Use Prisma types for model consistency.**
- **Handle email lookups via the Auth table, not directly on role models.**
- **Support pagination and dynamic filtering in all list endpoints.**
- **Apply authentication and role resolution middleware to protected routes.**
- **Document all endpoints in the `docs/api/` folder.**

---

## Example Flow (Auditor)
1. **Repository:** `auditorRepository.getAllAuditorsPaginated()`
2. **Use Case:** `auditorUseCases.getAllAuditorsPaginated(req.query)`
3. **Controller:** `AuditorController.getAllAuditors(req, res)`
4. **Route:** `router.get('/', authMiddleware, AuditorController.getAllAuditors)`
5. **Middleware:** `authMiddleware` attaches `req.auditor`
6. **App:** Mounts `/api/v1/auditors` router

---

By following this pattern, you ensure all role-related APIs are consistent, maintainable, and easy for new developers to understand and extend. 