import { Router } from 'express';
import {
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from './users.controller';

const usersRouter = Router();

usersRouter.get('/', getUsersController);
usersRouter.get('/:id', getUserController);
usersRouter.put('/:id', updateUserController);
usersRouter.delete('/:id', deleteUserController);

export default usersRouter;
