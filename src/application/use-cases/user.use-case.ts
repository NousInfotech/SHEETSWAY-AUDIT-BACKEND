import { userRepository } from '../../infrastructure/db/repositories/user.repository.js';
import { authRepository } from '../../infrastructure/db/repositories/auth.repository.js';
import prisma from '../../infrastructure/db/connection/prisma.client.js';
import type { Prisma, Role } from '@prisma/client';

export interface RegisterUserData {
  firebaseId: string;
  name?: string;
  email: string;
  role?: Role;
}

export const userUseCases = {
  // Complete registration flow
  registerUser: async (data: RegisterUserData) => {
    // 1. Create/upsert Auth record
    const auth = await authRepository.upsertAuth({
      firebaseId: data.firebaseId,
      email: data.email as string
    });

    // 2. Create/upsert User profile (handle existing user)
    const user = await userRepository.upsertUser({
      authId: auth.id,
      name: data.name
    });

    // 3. Create RoleMap if role is specified and doesn't exist
    if (data.role) {
      try {
        const roleResult = await authRepository.createRoleProfile({
          authId: auth.id,
          role: data.role,
          profileData: { name: data.name }
        });
      } catch (error: any) {
        console.error('Error creating role profile:', error);
        // If role already exists, ignore the error
        if (error.code !== 'P2002') {
          throw error;
        }
      }
    }

    return { auth, user };
  },

  getAllUsersPaginated: async (query: any) => {
    const { limit = 10, page = 1, ...rest } = query;
    const searchText = query['search.text'];
    const searchField = query['search.field'];

    // --- Search Mode ---
    if (searchText && searchField) {
      if (searchField === 'email') {
        // Search Auth table for emails starting with searchText
        const auths = await prisma.auth.findMany({
          where: { email: { startsWith: searchText, mode: 'insensitive' } }
        });
        const authIds = auths.map(a => a.id);
        if (authIds.length === 0) return { users: [], total: 0 };
        return userRepository.getAllUsersPaginated({
          filters: {},
          limit: Number(limit),
          page: Number(page),
          authIds
        });
      } else {
        // User field prefix search
        const filters: Record<string, any> = {};
        filters[searchField] = { startsWith: searchText, mode: 'insensitive' };
        return userRepository.getAllUsersPaginated({
          filters,
          limit: Number(limit),
          page: Number(page)
        });
      }
    }

    // --- FieldName Mode ---
    const filters: Record<string, any> = {};
    let authIds: string[] | undefined = undefined;

    if (rest.email) {
      const auth = await prisma.auth.findUnique({ where: { email: rest.email } });
      if (auth) {
        filters.authId = auth.id;
      } else {
        return { users: [], total: 0 };
      }
      delete rest.email;
    }

    Object.keys(rest).forEach(key => {
      if (key !== 'limit' && key !== 'page') {
        filters[key] = rest[key];
      }
    });

    return userRepository.getAllUsersPaginated({
      filters,
      limit: Number(limit),
      page: Number(page),
      authIds
    });
  },

  getUserById: async (id: string) => {
    return userRepository.getUserById(id);
  },

  getUserByAuthId: async (authId: string) => {
    return userRepository.getUserByAuthId(authId);
  },

  updateUser: async (id: string, data: Prisma.UserUpdateInput) => {
    return userRepository.updateUser(id, data);
  },

  deleteUser: async (id: string) => {
    return userRepository.deleteUser(id);
  },

  getAllUsers: async () => {
    return userRepository.getAllUsers();
  },
};

export default userUseCases;
