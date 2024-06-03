import { NextFunction, Request, Response } from "express";
import buildResponse, { R } from "../utils/responseBuilder";

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

export default function errorMiddleware(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const statusCode = err instanceof HttpError ? err.status : 500;
  const errorResponse: R = buildResponse(
    err.message || "An unexpected error occurred",
    null,
    false
  );

  res.status(statusCode).json(errorResponse);
}
