"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnect_1 = require("./config/dbconnect");
require("./models/usersModel");
require("./models/postsModel");
const dotenv_1 = require("dotenv");
const allRoutes_1 = __importDefault(require("./routes/allRoutes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = 3000;
(0, dbconnect_1.connectDatabase)();
app.use(express_1.default.json());
app.use('/api', allRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to my Server');
});
app.listen(port, () => {
    console.log(`Server is live on http://localhost:${port}`);
});
