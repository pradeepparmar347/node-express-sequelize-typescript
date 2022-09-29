import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import morganMiddleware from './config/morganMiddleware';
import Logger from './lib/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(morganMiddleware);
const baseUrl = process.env.BASE_URL || '/';
const apiBaseUrl = process.env.API_BASE_URL || '/api/';

app.get(baseUrl, (req: Request, res: Response) => {
  res.send('⚡️Express + TypeScript Server');
});

app.get(apiBaseUrl, (req: Request, res: Response) => {
  res.send('⚡️Express + TypeScript apis');
});

app.get(baseUrl + 'logging', (req: Request, res: Response) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');
  res.send('⚡️Express + TypeScript Server');
});

app.get('*', function (req: Request, res: Response) {
  res.send('The resource you are looking for is not found.');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
