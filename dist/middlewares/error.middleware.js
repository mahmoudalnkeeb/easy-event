"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const responseBuilder_1 = __importDefault(require("../utils/responseBuilder"));
class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "HttpError";
    }
}
exports.HttpError = HttpError;
function errorMiddleware(err, req, res, next) {
    console.error(err);
    const statusCode = err instanceof HttpError ? err.status : 500;
    const errorResponse = (0, responseBuilder_1.default)(err.message || "An unexpected error occurred", null, false);
    res.status(statusCode).json(errorResponse);
}
exports.default = errorMiddleware;
