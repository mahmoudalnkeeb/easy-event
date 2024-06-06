import { Router } from 'express';
import { adminLoginController, adminSignupController, userLoginController, userSignupController } from './auth.controller';

const authRouter = Router();

authRouter.post('/login', userLoginController);
authRouter.post('/signup', userSignupController);
authRouter.post('/cp/login' , adminLoginController)
authRouter.post('/cp/signup' , adminSignupController)

export default authRouter;
