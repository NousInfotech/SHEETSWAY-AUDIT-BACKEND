import { z } from 'zod';

export const auditorRegisterSchema = z.object({
  firmName: z.string().min(2, "Firm name is required"),
  licenseNumber: z.string().min(2, "License number is required"),
});

export type AuditorRegisterInput = z.infer<typeof auditorRegisterSchema>;
