import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebase.config.js';
import prisma from '../infrastructure/db/connection/prisma.client.js';
import { sendError } from '../utils/sendError.js';

interface MiddleWareRequest extends Request {
  firebaseId?: string;
  authRole?: string;
  user?: any;
  auditor?: any;
  admin?: any;
  userId?: string;
}

// Helper: Verify Firebase token
const verifyFirebaseToken = async (req: MiddleWareRequest) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) throw { status: 401, message: 'Missing Bearer token' };

  const decoded = await admin.auth().verifyIdToken(token);
  req.firebaseId = decoded.uid;
};

// Helper: Get role from header
const getHeaderRole = (req: MiddleWareRequest): string | undefined => {
  const raw = req.headers['x-active-role']?.toString().toUpperCase();
  if (!raw) return undefined;
  // You can define your Role enum or use string validation
  const validRoles = ['USER', 'AUDITOR', 'ADMIN'];
  return validRoles.includes(raw) ? raw : undefined;
};

// Helper: Resolve role profile
const resolveRoleProfile = async (req: MiddleWareRequest) => {
  const firebaseId = req.firebaseId;
  if (!firebaseId) throw { status: 400, message: 'Missing Firebase ID' };

  // Find Auth record by firebaseId
  const auth = await prisma.auth.findUnique({
    where: { firebaseId },
    include: { roles: true }
  });

  if (!auth) {
    throw { status: 404, message: 'Auth record not found' };
  }

  const requestedRole = getHeaderRole(req);
  
  const activeRole = requestedRole || 'USER'; // Default to USER if no header

  req.authRole = activeRole;

  // Find the specific role mapping
  const roleMap = auth.roles.find(role => role.role === activeRole);
  
  if (!roleMap) {
    throw { status: 403, message: `User does not have ${activeRole} role` };
  }

  // Get the appropriate profile based on role
  switch (activeRole) {
    case 'USER':
      const user = await prisma.user.findUnique({
        where: { id: roleMap.roleId }
      });
      if (!user) throw { status: 404, message: 'User profile not found' };
      req.user = user;
      req.userId = user.id;
      break;
      
    case 'AUDITOR':
      const auditor = await prisma.auditor.findUnique({
        where: { id: roleMap.roleId }
      });
      if (!auditor) throw { status: 404, message: 'Auditor profile not found' };
      req.auditor = auditor;
      break;
      
    case 'ADMIN':
      const admin = await prisma.admin.findUnique({
        where: { id: roleMap.roleId }
      });
      if (!admin) throw { status: 404, message: 'Admin profile not found' };
      req.admin = admin;
      break;
  }

  if (!req.user && !req.auditor && !req.admin) {
    throw { status: 404, message: 'Profile not found for role' };
  }
};

// Main middleware
export const authMiddleware = async (req: MiddleWareRequest, res: Response, next: NextFunction) => {
  try {
    await verifyFirebaseToken(req);
    await resolveRoleProfile(req);
    next();
  } catch (error: any) {
    const status = error?.status || 401;
    const message = error?.message || 'Unauthorized';
    sendError(res, status, message);
  }
};