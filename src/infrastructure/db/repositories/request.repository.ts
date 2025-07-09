import prisma from '../connection/prisma.client.js';
import { Prisma } from '@prisma/client';

export const requestRepository = {
  createRequest: (data: Prisma.RequestCreateInput) => {
    return prisma.request.create({ data });
  },

  getAllRequests: () => {
    return prisma.request.findMany({ orderBy: { createdAt: 'desc' } });
  },

  getRequestsAsArray: () => {
    return prisma.request.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  updateRequest: (id: string, data: Prisma.RequestUpdateInput) => {
    return prisma.request.update({ where: { id }, data });
  },

  deleteRequest: (id: string) => {
    return prisma.request.delete({ where: { id } });
  },

  patchRequestStatus: (id: string, status: string) => {
    return prisma.request.update({ where: { id }, data: { status } });
  },
};
