import express, { Application, Request, Response } from 'express';
import sequelize from './config/dbconnect';
import { config } from 'dotenv';
config();

const app: Application = express();
const port: number = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Server');
});

app.listen(port, () => {
  console.log(`Server is live on http://localhost:${port}`);
});
