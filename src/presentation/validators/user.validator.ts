import { z } from 'zod';

export const userSchema = z.object({
  firebaseId: z.string(),
  email: z.string().email("email is required"),
  name: z.string().min(1, "name is required"),
  role: z.enum(['USER', 'AUDITOR', 'ADMIN']),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
});

export const userIdParamsSchema = z.object({
  userId: z.string().uuid(),
});
