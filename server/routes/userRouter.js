import { Router } from 'express';
import { logIn, register, updateProfile } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const userRouter = Router();
userRouter.post('/register', register);
userRouter.post('/login', logIn);
userRouter.post('/updateProfile', auth, updateProfile);

export default userRouter;
