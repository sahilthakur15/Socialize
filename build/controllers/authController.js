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
exports.loginUser = exports.registerUser = void 0;
const authvalidation_1 = require("../utils/validations/authvalidation");
const authServices_1 = __importDefault(require("../services/authServices"));
const apiResponse_1 = require("../utils/apiResponse");
const messages_1 = __importDefault(require("../utils/messages"));
const passHandler_1 = __importDefault(require("../utils/handlers/passHandler"));
const JWTHandler_1 = __importDefault(require("../utils/handlers/JWTHandler"));
// register user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = (0, authvalidation_1.registerValidation)(req.body);
        if (error) {
            return apiResponse_1.APIResponse.error(res, {
                status: 400,
                message: 'Validation failed',
                data: error.details.map((err) => err.message),
            });
        }
        const existingUser = yield authServices_1.default.checkUser(value.email);
        if (existingUser) {
            return apiResponse_1.APIResponse.error(res, {
                status: 400,
                message: messages_1.default.ERROR.USER_ALREADY_EXISTS,
            });
        }
        const hashedPassword = yield passHandler_1.default.hashPassword(value.password);
        const newUser = yield authServices_1.default.createUser(value.name, value.email, hashedPassword);
        return apiResponse_1.APIResponse.success(res, {
            status: 201,
            message: messages_1.default.SUCCESS.REGISTER,
            data: newUser,
        });
    }
    catch (error) {
        return apiResponse_1.APIResponse.error(res, {
            status: 500,
            message: messages_1.default.ERROR.INTERNAL_SERVER_ERROR,
            data: error,
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = (0, authvalidation_1.loginValidation)(req.body);
        if (error) {
            return apiResponse_1.APIResponse.error(res, {
                status: 400,
                message: 'Validation failed',
                data: error.details.map((err) => err.message),
            });
        }
        const user = yield authServices_1.default.checkUser(value.email);
        if (!user) {
            return apiResponse_1.APIResponse.error(res, {
                status: 400,
                message: messages_1.default.ERROR.USER_NOT_FOUND,
            });
        }
        const isPasswordValid = yield passHandler_1.default.comparePassword(value.password, user.getDataValue('password'));
        if (!isPasswordValid) {
            return apiResponse_1.APIResponse.error(res, {
                status: 400,
                message: messages_1.default.ERROR.INVALID_CREDENTIALS,
            });
        }
        const token = yield JWTHandler_1.default.generateToken(user.getDataValue('id'));
        return apiResponse_1.APIResponse.success(res, {
            status: 200,
            message: messages_1.default.SUCCESS.LOGIN,
            data: { token, user }
        });
    }
    catch (error) {
        return apiResponse_1.APIResponse.error(res, {
            status: 500,
            message: messages_1.default.ERROR.LOGIN_FAILED,
            data: error,
        });
    }
});
exports.loginUser = loginUser;
// export {
//   registerUser,
//   loginUser
// }
