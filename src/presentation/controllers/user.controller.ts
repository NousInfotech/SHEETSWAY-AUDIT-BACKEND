import { Request, Response } from "express";
import { validate } from "../../utils/validation.js";
import { tryCatch } from "../../utils/tryCatch.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { sendError } from "../../utils/sendError.js";
import { HTTP } from "../../utils/constants.js";
import { userUseCases } from "../../application/use-cases/user.use-case.js";
import {
    userSchema,
    updateUserSchema,
    userIdParamsSchema,
} from "../validators/user.validator.js";

interface CustomRequest extends Request {
    userId?: string;
}

export const UserController = {
    async createUser(req: Request, res: Response) {
        const validated = validate(userSchema, req.body, res);
        if (!validated) return;

        return tryCatch(res, async () => {
            const user = await userUseCases.registerUser(validated);
            return sendResponse(res, HTTP.CREATED, "User created successfully", user);
        });
    },


    async getUserById(req: Request, res: Response) {
        let userId = (req as any).userId;
        if (!userId) {
            // Fallback: validate and use params
            const parsed = validate(userIdParamsSchema, req.params, res);
            if (!parsed) return;
            userId = parsed.userId;
        }

        return tryCatch(res, async () => {
            const user = await userUseCases.getUserById(userId);
            if (!user) return sendError(res, HTTP.NOT_FOUND, "User not found");
            return sendResponse(res, HTTP.OK, "User fetched successfully", user);
        });
    },

    async updateUser(req: Request, res: Response) {
        const paramCheck = validate(userIdParamsSchema, req, res);
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
        const parsed = validate(userIdParamsSchema, req, res);
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
            const result = await userUseCases.getAllUsersPaginated(req.query);
            return sendResponse(res, HTTP.OK, 'Users fetched successfully', result);
        });
    }
};
