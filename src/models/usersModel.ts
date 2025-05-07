import { DataTypes } from 'sequelize';
import {dbconnect} from '../config/dbconnect';
import logger from '../utils/logger/logger';

const Users = dbconnect.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
);
Users.sync()
  .then(() => {
    logger.info('Users table created successfully');
  })
  .catch((error) => {
    logger.error('Error creating table:', error);
  });

export default Users;
