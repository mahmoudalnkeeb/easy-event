"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    dbURI: process.env.DB_URI,
    port: parseInt(process.env.PORT),
    rounds: parseInt(process.env.ROUNDS),
    jwtSecret: process.env.JWT_SECRET,
};
