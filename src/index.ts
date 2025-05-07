import express, { Application, Request, Response } from 'express';
import {connectDatabase} from './config/dbconnect';
import './models/usersModel';
import './models/postsModel'

import { config } from 'dotenv';
import  authRoutes  from './routes/authRoutes';
config();

const app: Application = express();
const port: number = 3000;

connectDatabase();
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Server');
});

app.use('/api', authRoutes); 


app.listen(port, () => {
  console.log(`Server is live on http://localhost:${port}`);
});
