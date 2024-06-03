"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", auth_controller_1.userLoginController);
authRouter.post("/signup", auth_controller_1.userSignupController);
exports.default = authRouter;
