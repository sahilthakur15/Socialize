"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const registerValidation = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(4).max(20).required(),
        email: joi_1.default.string().min(4).required().email(),
        password: joi_1.default.string()
            .min(6)
            .required()
            .pattern(new RegExp('[a-z]'), 'at least one lowercase letter')
            .pattern(new RegExp('[A-Z]'), 'at least one uppercase letter')
            .pattern(new RegExp('[0-9]'), 'at least one number')
            .pattern(new RegExp('[!@#$%^&*(),.?":{}|<>]'), 'at least one special character')
    });
    return schema.validate(data);
};
exports.registerValidation = registerValidation;
const loginValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string()
            .min(6)
            .required()
            .pattern(new RegExp('[a-z]'), 'at least one lowercase letter')
            .pattern(new RegExp('[A-Z]'), 'at least one uppercase letter')
            .pattern(new RegExp('[0-9]'), 'at least one number')
            .pattern(new RegExp('[!@#$%^&*(),.?":{}|<>]'), 'at least one special character')
    });
    return schema.validate(data);
};
exports.loginValidation = loginValidation;
