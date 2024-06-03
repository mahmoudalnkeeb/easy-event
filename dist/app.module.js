"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_module_1 = __importDefault(require("./modules/users/users.module"));
const app_router_1 = __importDefault(require("./app.router"));
const auth_module_1 = __importDefault(require("./modules/auth/auth.module"));
exports.default = {
    ver: "v1",
    modules: [users_module_1.default, auth_module_1.default],
    router: app_router_1.default,
};
