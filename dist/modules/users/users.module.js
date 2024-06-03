"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_router_1 = __importDefault(require("./users.router"));
exports.default = {
    name: "users",
    router: users_router_1.default,
};
