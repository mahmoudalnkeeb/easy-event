import { Handler, NextFunction, Request, Response } from 'express';

function logger(level: string): Handler {
  return (req: Request, res: Response, next: NextFunction) => {
  };
}
