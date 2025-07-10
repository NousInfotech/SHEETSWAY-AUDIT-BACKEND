import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../../middleware/firebaseAuth.js';

const userRouter = Router();

// Public routes
userRouter.post('/', UserController.createUser);

// Protected routes
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:userId', authMiddleware, UserController.getUserById);
userRouter.put('/:userId', authMiddleware, UserController.updateUser);
userRouter.delete('/:userId', authMiddleware, UserController.deleteUser);

export default userRouter;
