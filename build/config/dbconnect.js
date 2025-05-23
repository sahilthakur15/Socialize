"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.dbconnect = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
const logger_1 = __importDefault(require("../utils/logger/logger"));
(0, dotenv_1.config)();
const dbconnect = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
exports.dbconnect = dbconnect;
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbconnect.authenticate();
        logger_1.default.info('Connection has been established successfully.');
    }
    catch (error) {
        logger_1.default.error('Unable to connect to the database:', error);
    }
});
exports.connectDatabase = connectDatabase;
