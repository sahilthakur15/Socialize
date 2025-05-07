import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import logger from '../utils/logger/logger';
config();

const dbconnect = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: 'mysql',
  },
);

const connectDatabase = async () => {
  try{
    await dbconnect.authenticate();
    logger.info('Connection has been established successfully.')

  } catch(error){
    logger.error('Unable to connect to the database:', error)

  }
}

export  {
  dbconnect,
  connectDatabase};
