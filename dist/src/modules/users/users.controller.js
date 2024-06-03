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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUserController = exports.getUsersController = void 0;
const user_model_1 = require("../../models/user.model");
// @role:admin
function getUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, limit = 10 } = req.query;
            const users = yield (0, user_model_1.getUsers)(+page || 1, +limit || 10);
            const statusCode = users.length ? 200 : 404;
            res.status(statusCode).json({
                data: users || [],
                error: null,
                statusCode,
                message: users.length ? "users fetched successfully" : "no users found",
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUsersController = getUsersController;
// @role:admin
function getUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_model_1.getUser)(req.params.id);
            const statusCode = user ? 200 : 404;
            res.status(statusCode).json({
                data: user || [],
                error: null,
                message: user
                    ? "user found successfully"
                    : "no user found with requested id",
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUserController = getUserController;
// @role:user
function updateUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, phone } = req.body;
            const user = yield (0, user_model_1.updateUser)(req.params.id, { phone, fullname });
            const statusCode = user ? 200 : 404;
            res.status(statusCode).json({
                data: user || [],
                error: null,
                message: user
                    ? "user updated successfully"
                    : "no user found with requested id",
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateUserController = updateUserController;
// @role:admin
function deleteUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_model_1.deleteUser)(req.params.id);
            const statusCode = user ? 200 : 404;
            res.status(statusCode).json({
                data: user || [],
                error: null,
                message: user
                    ? "user deleted successfully"
                    : "no user found with requested id",
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteUserController = deleteUserController;
