import { z } from 'zod';

export const requestSchema = z.object({
  userId: z.string().uuid({ message: "Invalid user ID format" }),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  status: z.enum(["pending", "accepted", "rejected"]).optional(),
});

export const updateRequestSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  status: z.enum(["pending", "accepted", "rejected"]).optional(),
});

export const patchStatusSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"]),
});
