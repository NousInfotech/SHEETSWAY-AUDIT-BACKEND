# SHEETSWAY-AUDIT-BACKEND

SHEETSWAY-AUDIT-BACKEND is a robust, scalable backend service designed for the Sheetsway Audit Marketplace platform. Built with modern TypeScript, Express.js, and Prisma ORM, it provides a secure and modular REST API for managing users and marketplace operations.

## Key Features

- **Authentication:** Secure user authentication and authorization using Firebase Auth middleware.
- **Database:** Uses Prisma ORM with Neon/PostgreSQL for reliable, scalable data storage.
- **Modular Architecture:** Clean separation of concerns with domain-driven design—application, domain, infrastructure, and presentation layers.
- **Validation:** Strong runtime validation using Zod schemas for all API inputs.
- **API Documentation:** Comprehensive API docs for all endpoints (see `docs/api/`).
- **Production Ready:** Includes security best practices (Helmet, rate limiting), logging, and error handling.

## Tech Stack
- Node.js, Express.js
- TypeScript
- Prisma ORM
- Neon/PostgreSQL
- Firebase Admin SDK (for Auth)
- Zod (validation)

## Getting Started
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/NousInfotech/SHEETSWAY-AUDIT-BACKEND.git
   cd SHEETSWAY-AUDIT-BACKEND
   npm install
   ```
2. Set up your `.env` file with the required environment variables (see `src/config/env.ts`).
3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Reference
See [docs/api/user.api.md](docs/api/user.api.md) for detailed user API documentation.

---

© 2024 Nous Infotech. All rights reserved.
