import { Router } from 'express';
import {
  adminLoginController,
  adminSignupController,
  userLoginController,
  userSignupController,
} from './auth.controller';
<<<<<<< HEAD
=======
import { requireSecretKey } from '../../middlewares/access.middleware';
>>>>>>> 5bd7998 (feat:cp signup require secret key)

const authRouter = Router();

authRouter.post('/login', userLoginController);
authRouter.post('/signup', userSignupController);
authRouter.post('/cp/login', adminLoginController);
<<<<<<< HEAD
authRouter.post('/cp/signup', adminSignupController);
=======
authRouter.post('/cp/signup',requireSecretKey, adminSignupController);
>>>>>>> 5bd7998 (feat:cp signup require secret key)

export default authRouter;
