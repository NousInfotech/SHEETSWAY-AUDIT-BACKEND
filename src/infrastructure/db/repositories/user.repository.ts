import prisma from '../connection/prisma.client.js';
import type { Prisma, User } from '@prisma/client';

export const userRepository = {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  },

  async upsertUser(data: { authId: string; name?: string }): Promise<User> {
    return prisma.user.upsert({
      where: { authId: data.authId },
      update: { name: data.name },
      create: {
        authId: data.authId,
        name: data.name
      }
    });
  },

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async getUserByAuthId(authId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { authId } });
  },

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    return prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: string): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  },

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  },

  async getAllUsersPaginated({
    filters = {},
    limit = 10,
    page = 1,
    authIds
  }: {
    filters?: Record<string, any>;
    limit?: number;
    page?: number;
    authIds?: string[];
  }): Promise<{ users: User[]; total: number }> {
    const where: Prisma.UserWhereInput = { ...filters };
    if (authIds && authIds.length > 0) {
      where.authId = { in: authIds };
    }
    const total = await prisma.user.count({ where });
    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
    return { users, total };
  }
};
