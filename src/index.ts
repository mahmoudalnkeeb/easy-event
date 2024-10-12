import express, { Application } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
dotenv.config();
export const NODE_ENV = process.env.NODE_ENV || 'production';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(
  cors({
    origin: [],
  })
);

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('server is running on port >', port, '| Environment =', NODE_ENV);
});
