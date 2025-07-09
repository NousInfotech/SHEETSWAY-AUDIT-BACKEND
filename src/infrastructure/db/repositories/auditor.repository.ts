import prisma from '../connection/prisma.client';

export const auditorRepository = {
  getAuditorByEmail: async (email: string) => {
    return prisma.auditor.findUnique({
      where: { email },
    });
  },

  createAuditor: async (data: {
    firebaseId: string;
    email: string;
    name: string;
    firmName: string;
    licenseNumber: string;
  }) => {
    return prisma.auditor.create({
      data,
    });
  },
};
