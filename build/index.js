"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnect_1 = __importDefault(require("./config/dbconnect"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = 3000;
dbconnect_1.default
    .authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
});
app.get('/', (req, res) => {
    res.send('Welcome to my Server');
});
app.listen(port, () => {
    console.log(`Server is live on http://localhost:${port}`);
});
