"use strict";
// utils/APIResponse.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
class APIResponse {
    static success(res, data = {
        status: 200,
        message: "OK",
        data: {},
    }) {
        return res.status(data.status).json(data);
    }
    static error(res, data) {
        return res.status(data.status).json(data);
    }
}
exports.APIResponse = APIResponse;
