import express, { Request, Response } from 'express';
import * as seeder from './seed';
import userRouter from './src/user/user.routes';
import groupRouter from './src/groups/group.routes';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

async function start(): Promise<void> {
  // Seed the database
  await seeder.seedDatabase();

  // App
  const app = express();

  // Health check
  app.get('/health', (req: Request, res: Response) => {
    res.send('Hello World');
  });

  app.use('/users', userRouter); 
  app.use('/groups', groupRouter);

  // Write your endpoints here

  app.listen(PORT, HOST);
  console.log(`Server is running on http://${HOST}:${PORT}`);
}

start();
