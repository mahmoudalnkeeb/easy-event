import { NextFunction, Request, Response } from 'express';
import buildResponse from '../utils/responseBuilder';
import messages from '../config/messages';
import envConfig from '../config/env.config';

type AuthenticatedRequest = Request & { user: { id: string; role: string } };
export function requireRole(role: string) {
  return function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    let response;
    const userRole = req.user?.role;
    if (!userRole) {
      response = buildResponse(messages.role_required, null, false);
      return res.status(400).json(response);
    }
    if (userRole != role) {
      response = buildResponse(messages.no_permission, null, false);
      return res.status(400).json(response);
    }
    next();
  };
}

export function requireSecretKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let response;
  const secretKeyHeader = req.headers.secret_key;
  if (!secretKeyHeader) {
    response = buildResponse(messages.secret_key_required, null, false);
    return res.status(401).json(response);
  }
  if (secretKeyHeader != envConfig.secret_key) {
    response = buildResponse(messages.invalid_secret_key, null, false);
    return res.status(401).json(response);
  }
  next();
}
