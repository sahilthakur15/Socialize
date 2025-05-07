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
exports.registerUser = void 0;
const userServices_1 = __importDefault(require("../services/userServices"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Please fill all the fields' });
        }
        const isUserExist = yield userServices_1.default.checkUser(email);
        if (isUserExist) {
            res.status(400).json({ message: 'User already exists' });
        }
        const newUser = yield userServices_1.default.createUser(name, email, password);
        res.status(201).json({ message: 'User created successfully', newUser });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.registerUser = registerUser;
