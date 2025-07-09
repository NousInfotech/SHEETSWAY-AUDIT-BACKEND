import { requestRepository } from '../../infrastructure/db/repositories/request.repository.js';

export const requestUseCases = {
  createRequest: async (data: any) => {
    return requestRepository.createRequest(data);
  },

  getAllRequests: async () => {
    return requestRepository.getAllRequests();
  },

  getRequestsAsArray: async () => {
    return requestRepository.getRequestsAsArray();
  },

  updateRequest: async (id: string, data: any) => {
    return requestRepository.updateRequest(id, data);
  },

  deleteRequest: async (id: string) => {
    return requestRepository.deleteRequest(id);
  },

  patchStatus: async (id: string, status: string) => {
    return requestRepository.patchRequestStatus(id, status);
  },
};
