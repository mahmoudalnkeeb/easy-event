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
exports.createAdmin = exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const env_config_1 = __importDefault(require("../config/env.config"));
const adminSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    profile_pic: {
        url: {
            type: String,
            required: true,
            default: "default:avatar",
        },
        secure_url: {
            type: String,
            required: true,
            default: "default:avatar",
        },
        metadata: {
            height: Number,
            width: Number,
            bytes: Number,
            format: String,
            public_id: String,
            asset_id: String,
        },
    },
    access_level: {
        type: String,
        enum: ["ADMIN", "SUPER_ADMIN", "ATTENDANCE_MANAGER"],
    },
    account_created_at: { type: Date, default: Date.now },
});
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
function createAdmin(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password, username, access_level = "ADMIN", }) {
        const password_salt = (0, bcrypt_1.genSaltSync)(env_config_1.default.rounds);
        const password_hash = (0, bcrypt_1.hashSync)(password + password_salt, password_salt);
        const adminData = {
            email,
            username,
            password_hash,
            password_salt,
            access_level,
        };
        const admin = yield exports.Admin.create(adminData);
        return {
            username: admin.username,
            created_at: admin.account_created_at,
        };
    });
}
exports.createAdmin = createAdmin;
