import { NextFunction, Response, Request } from "express";
import {
  compareUserPassword,
  createUser,
  isValidEmail,
  isValidUsername,
} from "../../models/user.model";
import { UserSignup } from "../../interfaces/auth.interface";
import jwt from "jsonwebtoken";
import buildResponse from "../../utils/responseBuilder";
import messages from "../../config/messages";
import envConfig from "../../config/env.config";
import { Schema } from "mongoose";

export async function userSignupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let response;
    const userData: UserSignup = req.body;
    const emailUsed = await isValidEmail(userData.email);
    const usernameUsed = await isValidUsername(userData.username);
    if (emailUsed) {
      response = buildResponse(messages.email_exist, null, false);
      return res.status(400).json(response);
    }
    if (usernameUsed) {
      response = buildResponse(messages.username_exist, null, false);
      return res.status(400).json(response);
    }
    const user = await createUser(userData);
    const token = jwt.sign(user, envConfig.jwtSecret);
    response = buildResponse(messages.account_created, { token }, true);
    console.log(response);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function userLoginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let response;
    const { username, email, password } = req.body;
    const isValidCredentials = await compareUserPassword(password, {
      email,
      username,
    });
    if (!isValidCredentials) {
      response = buildResponse(messages.invalid_credentials, null, false);
      return res.status(401).json(response);
    }
    const token = jwt.sign(
      isValidCredentials as {
        id: Schema.Types.ObjectId;
        created_at: Date;
      },
      envConfig.jwtSecret
    );
    response = buildResponse(messages.login_success, { token }, true);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function adminSignupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function adminLoginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    next(error);
  }
}
