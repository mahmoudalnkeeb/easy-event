"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineModulesRouter = void 0;
const express_1 = require("express");
const app_module_1 = __importDefault(require("./app.module"));
const router = (0, express_1.Router)();
router.get("/health", (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: "Ok",
        date: new Date(),
    };
    res.status(200).send(data);
});
// define modules routers
function defineModulesRouter() {
    const { modules } = app_module_1.default;
    for (const module of modules) {
        router.use(`/${module.name}`, module.router);
        console.log(`${module.name} definded on path /${module.name}`);
    }
}
exports.defineModulesRouter = defineModulesRouter;
exports.default = router;
