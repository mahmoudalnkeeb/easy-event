import { NextFunction, Request, Response } from 'express';

function handleErrors(err: Error, req: Request, res: Response, next: NextFunction): Response | void {
  if (err) {
  }
}
