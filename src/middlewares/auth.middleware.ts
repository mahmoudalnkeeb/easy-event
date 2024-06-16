import { NextFunction, Response } from 'express';
import buildResponse, { R } from '../utils/responseBuilder';
import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config';
import { AuthenticatedRequest } from './types';

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  let response: R;
  const token = req.headers['authorization'];
  if (!token) {
    response = buildResponse('', null, false);
    return res.status(401).json(response);
  }
  const payload = jwt.verify(token, envConfig.jwtSecret);
  if (!payload) {
    response = buildResponse('', null, false);
    return res.status(401).json(response);
  }
  req.user = payload as { id: string; role: string };
  return next();
}
