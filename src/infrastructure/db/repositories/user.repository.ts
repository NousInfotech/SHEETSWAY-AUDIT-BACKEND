import prisma from '../connection/prisma.client';
import { IUser } from '../../../domain/interfaces/user.interface';
import { Prisma } from '@prisma/client';

function toIUser(user: any): IUser {
  return {
    id: user.id,
    firebaseId: user.firebaseId,
    email: user.email,
    name: user.name ?? undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export const userRepository = {
  async createUser(data: Prisma.UserCreateInput): Promise<IUser> {
    const user = await prisma.user.create({ data });
    return toIUser(user);
  },

  async getUserById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? toIUser(user) : null;
  },

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? toIUser(user) : null;
  },

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<IUser | null> {
    const user = await prisma.user.update({ where: { id }, data });
    return toIUser(user);
  },

  async deleteUser(id: string): Promise<IUser | null> {
    const user = await prisma.user.delete({ where: { id } });
    return toIUser(user);
  },

  async getAllUsers(): Promise<IUser[]> {
    const users = await prisma.user.findMany();
    return users.map(toIUser);
  },
};
