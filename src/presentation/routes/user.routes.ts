import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../../middleware/firebaseAuth';

const userRouter = Router();

// Public route
userRouter.post('/', UserController.createUser);

// Protected Firebase route
userRouter.post('/firebase-register', authMiddleware, UserController.firebaseRegister);

// Protected CRUD routes
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUserById);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);

export default userRouter;
