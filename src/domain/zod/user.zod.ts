import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  firebaseId: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserType = z.infer<typeof UserSchema>;
