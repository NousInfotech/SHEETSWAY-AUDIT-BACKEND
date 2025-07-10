import prisma from '../connection/prisma.client.js';
import type { Role } from '@prisma/client';

export interface CreateAuthData {
  firebaseId: string;
  email: string;  
}

export interface CreateRoleProfileData {
  authId: string;
  role: Role;
  profileData: {
    name?: string;

    firmName?: string;
    licenseNumber?: string;
  };
}

export const authRepository = {
  // Create or update Auth record
  async upsertAuth(data: CreateAuthData) {
    return prisma.auth.upsert({
      where: { firebaseId: data.firebaseId },
      update: { email: data.email },
      create: { firebaseId: data.firebaseId, email: data.email },
      include: { roles: true }
    });
  },

  // Get Auth by firebaseId
  async getAuthByFirebaseId(firebaseId: string) {
    return prisma.auth.findUnique({
      where: { firebaseId },
      include: { roles: true }
    });
  },

  // Get Auth by ID
  async getAuthById(id: string) {
    return prisma.auth.findUnique({
      where: { id },
      include: { roles: true }
    });
  },

  // Delete Auth (cascades to roles and profiles)
  async deleteAuth(id: string) {
    return prisma.auth.delete({
      where: { id }
    });
  },

  // Check if RoleMap already exists
  async getRoleMap(authId: string, role: Role) {
    return prisma.roleMap.findUnique({
      where: {
        authId_role: {
          authId,
          role
        }
      }
    });
  },

  // Create role profile and role mapping
  async createRoleProfile(data: CreateRoleProfileData) {
    return prisma.$transaction(async (tx) => {
      // Check if RoleMap already exists
      const existingRoleMap = await tx.roleMap.findUnique({
        where: {
          authId_role: {
            authId: data.authId,
            role: data.role
          }
        }
      });

      if (existingRoleMap) {
        return { profileId: existingRoleMap.roleId, roleMap: existingRoleMap };
      }

      // Create role profile based on role type
      let profileId: string;
      
      switch (data.role) {
        case 'USER':
          // Use upsert since User profile might already exist
          const user = await tx.user.upsert({
            where: { authId: data.authId },
            update: { name: data.profileData.name || null },
            create: {
              authId: data.authId,
              name: data.profileData.name || null,
            }
          });
          profileId = user.id;
          break;
          
        case 'AUDITOR':
          const auditor = await tx.auditor.create({
            data: {
              authId: data.authId,
              name: data.profileData.name!,
              firmName: data.profileData.firmName!,
              licenseNumber: data.profileData.licenseNumber!,
            }
          });
          profileId = auditor.id;
          break;
          
        case 'ADMIN':
          const admin = await tx.admin.create({
            data: {
              authId: data.authId,
              name: data.profileData.name!,
            }
          });
          profileId = admin.id;
          break;
          
        default:
          throw new Error(`Invalid role: ${data.role}`);
      }

      // Create role mapping
      const roleMap = await tx.roleMap.create({
        data: {
          authId: data.authId,
          role: data.role,
          roleId: profileId,
        }
      });

      return { profileId, roleMap };
    });
  },

  // Get user profile by role
  async getUserProfile(authId: string) {
    return prisma.user.findUnique({
      where: { authId }
    });
  },

  // Get auditor profile by role
  async getAuditorProfile(authId: string) {
    return prisma.auditor.findUnique({
      where: { authId }
    });
  },

  // Get admin profile by role
  async getAdminProfile(authId: string) {
    return prisma.admin.findUnique({
      where: { authId }
    });
  },
}; 