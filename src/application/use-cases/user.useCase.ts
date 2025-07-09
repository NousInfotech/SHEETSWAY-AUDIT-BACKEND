import { userRepository } from "../../infrastructure/db/repositories/user.repository.js";
import { IUser } from "../../domain/interfaces/user.interface.js";

export const userUseCases = {
  createUser: async (data: Omit<IUser, "id" | "createdAt" | "updatedAt">) => {
    return userRepository.createUser(data);
  },

  getUserById: async (id: string) => {
    return userRepository.getUserById(id);
  },

  getUserByEmail: async (email: string) => {
    return userRepository.getUserByEmail(email);
  },

  updateUser: async (
    id: string,
    data: Partial<Omit<IUser, "id" | "createdAt" | "updatedAt">>
  ) => {
    return userRepository.updateUser(id, data);
  },

  deleteUser: async (id: string) => {
    return userRepository.deleteUser(id);
  },

  getAllUsers: async () => {
    return userRepository.getAllUsers();
  },

  // Firebase-specific use case
  createUserIfNotExists: async (
    firebaseId: string,
    email: string,
    name?: string
  ) => {
    const existing = await userRepository.getUserByEmail(email);
    if (existing) return existing;

    return userRepository.createUser({
      firebaseId,
      email,
      name,
    });
  },
};

export default userUseCases;
