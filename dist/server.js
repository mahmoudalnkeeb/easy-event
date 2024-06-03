"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_config_1 = __importDefault(require("./config/env.config"));
const port = env_config_1.default.port;
const server = app_1.default.listen(port, () => console.log('Server Running on port', port));
function gracefulshutdown() {
    console.log("Shutting down");
    server.close(() => {
        console.log("HTTP server closed.");
        // When server has stopped accepting 
        // connections exit the process with
        // exit status 0        
        process.exit(0);
    });
}
process.on("SIGTERM", gracefulshutdown);
process.on("SIGINT", gracefulshutdown);
