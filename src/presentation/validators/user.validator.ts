import { z } from 'zod';

export const userSchema = z.object({
  firebaseId: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export const userIdParamsSchema = z.object({
  userId: z.string().uuid(),
});
