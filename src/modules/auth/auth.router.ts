import { Router } from "express";
import { userLoginController, userSignupController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", userLoginController);
authRouter.post("/signup", userSignupController);

export default authRouter;
