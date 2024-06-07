import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId, Schema } from 'mongoose';
import envConfig from '../../config/env.config';
import messages from '../../config/messages';
import { UserSignup } from '../../interfaces/auth.interface';
import {
  compareAdminPassword,
  createAdmin,
  validateEmail,
  validateUsername,
} from '../../models/admin.model';
import {
  compareUserPassword,
  createUser,
  isValidEmail,
  isValidUsername,
} from '../../models/user.model';
import buildResponse from '../../utils/responseBuilder';

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
    let response;
    const { username, email, password } = req.body;
    const emailUsed = await validateEmail(email);
    const usernameUsed = await validateUsername(username);
    if (emailUsed) {
      response = buildResponse(messages.email_exist, null, false);
      return res.status(400).json(response);
    }
    if (usernameUsed) {
      response = buildResponse(messages.username_exist, null, false);
      return res.status(400).json(response);
    }
    const admin = await createAdmin({ username, email, password });
    const token = jwt.sign(admin, envConfig.jwtSecret);
    response = buildResponse(messages.account_created, { token }, true);
    console.log(response);
    return res.status(201).json(response);
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
    let response;
    const { password, username, email } = req.body;
    const isValidCredentials = await compareAdminPassword(password, {
      username,
      email,
    });
    if (!isValidCredentials) {
      response = buildResponse(messages.invalid_credentials, null, false);
      return res.status(401).json(response);
    }
    const token = jwt.sign(
      isValidCredentials as { id: ObjectId },
      envConfig.jwtSecret
    );
    response = buildResponse(messages.login_success, { token }, true);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
