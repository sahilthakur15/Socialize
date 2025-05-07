import { DataTypes } from 'sequelize';
import {dbconnect} from '../config/dbconnect.js'
import Users from './usersModel';
import logger from '../utils/logger/logger';

const Posts = dbconnect.define(
  'posts',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
);

Users.hasMany(Posts, { foreignKey: 'user_id' });
Posts.belongsTo(Users, { foreignKey: 'user_id' });

Posts.sync()
.then(()=>{
    logger.info('Posts table created successfully')
})
.catch((error)=>{
    logger.error('Error creating posts table', error)
});


export default Posts;
