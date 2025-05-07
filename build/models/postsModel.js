"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconnect_js_1 = require("../config/dbconnect.js");
const usersModel_1 = __importDefault(require("./usersModel"));
const logger_1 = __importDefault(require("../utils/logger/logger"));
const Posts = dbconnect_js_1.dbconnect.define('posts', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: usersModel_1.default,
            key: 'id',
        },
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    caption: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isDelete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
usersModel_1.default.hasMany(Posts, { foreignKey: 'user_id' });
Posts.belongsTo(usersModel_1.default, { foreignKey: 'user_id' });
Posts.sync()
    .then(() => {
    logger_1.default.info('Posts table created successfully');
})
    .catch((error) => {
    logger_1.default.error('Error creating posts table', error);
});
exports.default = Posts;
