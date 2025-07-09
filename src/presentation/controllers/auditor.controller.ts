import { Request, Response } from 'express';
import { tryCatch } from '../../utils/tryCatch';
import { sendResponse } from '../../utils/sendResponse';
import { sendError } from '../../utils/sendError';
import { HTTP } from '../../utils/constants';
import { auditorUseCases } from '../../application/use-cases/auditor.useCase';
import { validate } from '../../utils/validation';
import { auditorRegisterSchema } from '../../domain/zod/auditor.zod';

export const AuditorController = {
  firebaseRegister: async (req: Request, res: Response) => {
    const firebaseUid = (req as any).firebaseUid;
    const email = (req as any).user?.email;
    const name = (req as any).user?.name || 'Auditor';

    // Validate body
    const validated = validate(auditorRegisterSchema, req.body, res);
    if (!validated) return;

    const { firmName, licenseNumber } = validated;

    if (!firebaseUid || !email) {
      return sendError(res, HTTP.BAD_REQUEST, 'Missing Firebase fields');
    }

    return tryCatch(res, async () => {
      const auditor = await auditorUseCases.createAuditorIfNotExists(
        firebaseUid,
        email,
        name,
        firmName,
        licenseNumber
      );
      return sendResponse(res, HTTP.CREATED, 'Auditor registered with Firebase', auditor);
    });
  },
};
