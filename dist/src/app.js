"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_config_1 = __importDefault(require("./config/api.config"));
const db_config_1 = __importDefault(require("./config/db.config"));
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = __importDefault(require("./app.module"));
const app_router_1 = require("./app.router");
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const app = (0, express_1.default)();
(0, db_config_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: api_config_1.default.apiOrigins,
}));
(0, app_router_1.defineModulesRouter)();
app.use("/api/" + app_module_1.default.ver, app_module_1.default.router);
app.use(error_middleware_1.default);
exports.default = app;
