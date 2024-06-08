import { Router } from 'express';
import {
  adminLoginController,
  adminSignupController,
  userLoginController,
  userSignupController,
} from './auth.controller';
import { requireSecretKey } from '../../middlewares/access.middleware';
const authRouter = Router();

authRouter.post('/login', userLoginController);
authRouter.post('/signup', userSignupController);
authRouter.post('/cp/login', adminLoginController);
authRouter.post('/cp/signup', adminSignupController);
authRouter.post('/cp/signup',requireSecretKey, adminSignupController);

export default authRouter;
