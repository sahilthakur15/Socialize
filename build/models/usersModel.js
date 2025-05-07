"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconnect_1 = require("../config/dbconnect");
const logger_1 = __importDefault(require("../utils/logger/logger"));
const Users = dbconnect_1.dbconnect.define('users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
Users.sync()
    .then(() => {
    logger_1.default.info('Users table created successfully');
})
    .catch((error) => {
    logger_1.default.error('Error creating table:', error);
});
exports.default = Users;
