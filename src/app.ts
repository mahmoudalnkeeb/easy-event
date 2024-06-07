import express, { Application } from 'express';
import cors from 'cors';
import apiConfig from './config/api.config';
import initDB from './config/db.config';
import helmet from 'helmet';
import appModule from './app.module';
import { defineModulesRouter } from './app.router';
import errorMiddleware from './middlewares/error.middleware';

const app: Application = express();
initDB();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: apiConfig.apiOrigins,
  })
);

defineModulesRouter();
app.use('/api/' + appModule.ver, appModule.router);
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found', data: null, success: false });
});
app.use(errorMiddleware);

export default app;
