import { Router } from 'express';
import {
    logIn,
    register,
    updateProfile,
    deleteUser,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const userRouter = Router();
userRouter.post('/register', register);
userRouter.post('/login', logIn);
userRouter.post('/updateProfile', auth, updateProfile);
userRouter.post('/deleteUser', auth, deleteUser);

export default userRouter;
