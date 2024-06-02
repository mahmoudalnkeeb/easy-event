import { NextFunction, Request, Response } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../models/user.model";

// @role:admin
export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await getUsers(+page || 1, +limit || 10);

    const statusCode = users.length ? 200 : 404;
    res.status(statusCode).json({
      data: users || [],
      error: null,
      statusCode,
      message: users.length ? "users fetched successfully" : "no users found",
    });
  } catch (error) {
    next(error);
  }
}
// @role:admin
export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getUser(req.params.id);
    const statusCode = user ? 200 : 404;
    res.status(statusCode).json({
      data: user || [],
      error: null,
      message: user
        ? "user found successfully"
        : "no user found with requested id",
    });
  } catch (error) {
    next(error);
  }
}
// @role:user
export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fullname, phone } = req.body;
    const user = await updateUser(req.params.id, { phone, fullname });
    const statusCode = user ? 200 : 404;
    res.status(statusCode).json({
      data: user || [],
      error: null,
      message: user
        ? "user updated successfully"
        : "no user found with requested id",
    });
  } catch (error) {
    next(error);
  }
}
// @role:admin
export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await deleteUser(req.params.id);
    const statusCode = user ? 200 : 404;
    res.status(statusCode).json({
      data: user || [],
      error: null,
      message: user
        ? "user deleted successfully"
        : "no user found with requested id",
    });
  } catch (error) {
    next(error);
  }
}
