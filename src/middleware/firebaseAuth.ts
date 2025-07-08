// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseConfig";

export interface AuthenticatedRequest extends Request {
    firebaseUid?: string;
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];

        admin.auth().verifyIdToken(token)
            .then((decodedToken) => {
                req.firebaseUid = decodedToken.uid;
                next();
            })
            .catch((error) => {
                console.error("Firebase token verification failed:", error);
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            });
    } catch (error) {
        console.error("Firebase token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};