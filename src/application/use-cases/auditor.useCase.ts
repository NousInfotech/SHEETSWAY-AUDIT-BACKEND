import { auditorRepository } from '../../infrastructure/db/repositories/auditor.repository';

export const auditorUseCases = {
  createAuditorIfNotExists: async (
    firebaseId: string,
    email: string,
    name: string,
    firmName: string,
    licenseNumber: string
  ) => {
    const existing = await auditorRepository.getAuditorByEmail(email);
    if (existing) return existing;

    return auditorRepository.createAuditor({
      firebaseId,
      email,
      name,
      firmName,
      licenseNumber,
    });
  },
};
