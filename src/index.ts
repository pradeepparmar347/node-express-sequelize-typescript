import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Logger from './lib/logger';
import morganMiddleware from './config/morganMiddleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(morganMiddleware);

app.get('/', (req: Request, res: Response) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
