import { Router } from 'express';
import { authMiddleware } from '../../middleware/firebaseAuth';
import { AuditorController } from '../controllers/auditor.controller';

const auditorRouter = Router();

auditorRouter.post('/firebase-register', authMiddleware, AuditorController.firebaseRegister);

export default auditorRouter;
