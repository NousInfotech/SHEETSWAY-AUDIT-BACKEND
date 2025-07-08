import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../../middleware/firebaseAuth.js';

const userRouter = Router();

// Public route
userRouter.post('/', UserController.createUser);

// Protected routes
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUserById);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);

export default userRouter;
