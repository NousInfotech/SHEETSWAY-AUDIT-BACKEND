import { Request, Response } from "express";
import { validate } from "../../utils/validation";
import { tryCatch } from "../../utils/tryCatch";
import { sendResponse } from "../../utils/sendResponse";
import { sendError } from "../../utils/sendError";
import { HTTP } from "../../utils/constants";
import { userUseCases } from "../../application/use-cases/user.useCase";
import {
  userSchema,
  updateUserSchema,
  userIdParamsSchema,
} from "../validators/user.validator";

export const UserController = {
  async createUser(req: Request, res: Response) {
    const validated = validate(userSchema, req.body, res);
    if (!validated) return;

    return tryCatch(res, async () => {
      const user = await userUseCases.createUser(validated);
      return sendResponse(res, HTTP.CREATED, "User created successfully", user);
    });
  },

  async getUserById(req: Request, res: Response) {
    const parsed = validate(userIdParamsSchema, req.params, res);
    if (!parsed) return;

    const { userId } = parsed;

    return tryCatch(res, async () => {
      const user = await userUseCases.getUserById(userId);
      if (!user) return sendError(res, HTTP.NOT_FOUND, "User not found");
      return sendResponse(res, HTTP.OK, "User fetched successfully", user);
    });
  },

  async updateUser(req: Request, res: Response) {
    const paramCheck = validate(userIdParamsSchema, req.params, res);
    if (!paramCheck) return;

    const bodyCheck = validate(updateUserSchema, req.body, res);
    if (!bodyCheck) return;

    const { userId } = paramCheck;

    return tryCatch(res, async () => {
      const updated = await userUseCases.updateUser(userId, bodyCheck);
      if (!updated) return sendError(res, HTTP.NOT_FOUND, "User not found");
      return sendResponse(res, HTTP.OK, "User updated successfully", updated);
    });
  },

  async deleteUser(req: Request, res: Response) {
    const parsed = validate(userIdParamsSchema, req.params, res);
    if (!parsed) return;

    const { userId } = parsed;

    return tryCatch(res, async () => {
      const deleted = await userUseCases.deleteUser(userId);
      if (!deleted) return sendError(res, HTTP.NOT_FOUND, "User not found");
      return sendResponse(res, HTTP.OK, "User deleted successfully", deleted);
    });
  },

  async getAllUsers(req: Request, res: Response) {
    return tryCatch(res, async () => {
      const users = await userUseCases.getAllUsers();
      if (!users || users.length === 0) {
        sendError(res, HTTP.NOT_FOUND, "Users not found");
        return;
      }
      return sendResponse(res, HTTP.OK, "Users fetched successfully", users);
    });
  },

  // Firebase Registration Controller
  async firebaseRegister(req: Request, res: Response) {
    const firebaseUid = (req as any).firebaseUid;
    const email = (req as any).user?.email;
    const name = (req as any).user?.name || "Firebase User";

    if (!firebaseUid || !email) {
      return sendError(res, HTTP.BAD_REQUEST, "Firebase token missing required fields");
    }

    return tryCatch(res, async () => {
      const user = await userUseCases.createUserIfNotExists(firebaseUid, email, name);
      return sendResponse(res, HTTP.CREATED, "User registered with Firebase successfully", user);
    });
  },
};
