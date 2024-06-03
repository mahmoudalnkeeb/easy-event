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
exports.adminLoginController = exports.adminSignupController = exports.userLoginController = exports.userSignupController = void 0;
const user_model_1 = require("../../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseBuilder_1 = __importDefault(require("../../utils/responseBuilder"));
const messages_1 = __importDefault(require("../../config/messages"));
const env_config_1 = __importDefault(require("../../config/env.config"));
function userSignupController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response;
            const userData = req.body;
            const emailUsed = yield (0, user_model_1.isValidEmail)(userData.email);
            const usernameUsed = yield (0, user_model_1.isValidUsername)(userData.username);
            if (emailUsed) {
                response = (0, responseBuilder_1.default)(messages_1.default.email_exist, null, false);
                return res.status(400).json(response);
            }
            if (usernameUsed) {
                response = (0, responseBuilder_1.default)(messages_1.default.username_exist, null, false);
                return res.status(400).json(response);
            }
            const user = yield (0, user_model_1.createUser)(userData);
            const token = jsonwebtoken_1.default.sign(user, env_config_1.default.jwtSecret);
            response = (0, responseBuilder_1.default)(messages_1.default.account_created, { token }, true);
            console.log(response);
            return res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.userSignupController = userSignupController;
function userLoginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response;
            const { username, email, password } = req.body;
            const isValidCredentials = yield (0, user_model_1.compareUserPassword)(password, {
                email,
                username,
            });
            if (!isValidCredentials) {
                response = (0, responseBuilder_1.default)(messages_1.default.invalid_credentials, null, false);
                return res.status(401).json(response);
            }
            const token = jsonwebtoken_1.default.sign(isValidCredentials, env_config_1.default.jwtSecret);
            response = (0, responseBuilder_1.default)(messages_1.default.login_success, { token }, true);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.userLoginController = userLoginController;
function adminSignupController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(error);
        }
    });
}
exports.adminSignupController = adminSignupController;
function adminLoginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(error);
        }
    });
}
exports.adminLoginController = adminLoginController;
