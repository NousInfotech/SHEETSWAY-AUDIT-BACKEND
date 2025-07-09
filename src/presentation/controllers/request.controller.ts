import { Request, Response } from 'express';
import { tryCatch } from '../../utils/tryCatch.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { sendError } from '../../utils/sendError.js';
import { HTTP } from '../../utils/constants.js';
import { requestUseCases } from '../../application/use-cases/request.useCase.js';
import { validate } from '../../utils/validation.js';
import { requestSchema, updateRequestSchema, patchStatusSchema } from '../validators/request.validator.js';

export const RequestController = {
  createRequest: async (req: Request, res: Response) => {
    const validated = validate(requestSchema, req.body, res);
    if (!validated) return;

    return tryCatch(res, async () => {
      const request = await requestUseCases.createRequest(validated);
      return sendResponse(res, HTTP.CREATED, 'Request created successfully', request);
    });
  },

  getAllRequests: async (_req: Request, res: Response) => {
    return tryCatch(res, async () => {
      const requests = await requestUseCases.getAllRequests();
      return sendResponse(res, HTTP.OK, 'All requests fetched', requests);
    });
  },

  getRequestsAsArray: async (_req: Request, res: Response) => {
    return tryCatch(res, async () => {
      const requests = await requestUseCases.getRequestsAsArray();
      return sendResponse(res, HTTP.OK, 'Request array fetched', requests);
    });
  },

  updateRequest: async (req: Request, res: Response) => {
    const id = req.params.id;
    const validated = validate(updateRequestSchema, req.body, res);
    if (!validated) return;

    return tryCatch(res, async () => {
      const updated = await requestUseCases.updateRequest(id, validated);
      return sendResponse(res, HTTP.OK, 'Request updated', updated);
    });
  },

  deleteRequest: async (req: Request, res: Response) => {
    const id = req.params.id;

    return tryCatch(res, async () => {
      const deleted = await requestUseCases.deleteRequest(id);
      return sendResponse(res, HTTP.OK, 'Request deleted', deleted);
    });
  },

  patchStatus: async (req: Request, res: Response) => {
    const id = req.params.id;
    const validated = validate(patchStatusSchema, req.body, res);
    if (!validated) return;

    return tryCatch(res, async () => {
      const updated = await requestUseCases.patchStatus(id, validated.status);
      return sendResponse(res, HTTP.OK, 'Request status updated', updated);
    });
  },
};
