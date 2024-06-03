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
exports.isValidUsername = exports.isValidEmail = exports.updateUser = exports.deleteUser = exports.compareUserPassword = exports.createUser = exports.getUser = exports.getUsers = exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const env_config_1 = __importDefault(require("../config/env.config"));
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    email_verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    password_hash: {
        type: String,
        required: true,
    },
    password_salt: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
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
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
function getUsers() {
    return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const users = yield exports.User.find({}, null, { skip, limit });
            return users;
        }
        catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Failed to fetch users");
        }
    });
}
exports.getUsers = getUsers;
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield exports.User.findById(id);
        }
        catch (error) {
            console.error("Error fetching user:", error);
            throw new Error("Failed to fetch user");
        }
    });
}
exports.getUser = getUser;
function createUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ fullname, email, password, username, phone, }) {
        const password_salt = (0, bcrypt_1.genSaltSync)(env_config_1.default.rounds);
        const password_hash = (0, bcrypt_1.hashSync)(password + password_salt, password_salt);
        const userData = {
            fullname,
            email,
            username,
            phone,
            password_hash,
            password_salt,
        };
        const user = yield exports.User.create(userData);
        return {
            id: user._id,
            created_at: user.createdAt,
        };
    });
}
exports.createUser = createUser;
function compareUserPassword(password_1, _a) {
    return __awaiter(this, arguments, void 0, function* (password, { username = null, email = null, }) {
        try {
            if (!username && !email)
                return false;
            const user = yield exports.User.findOne(email ? { email } : { username });
            if (!user)
                return false;
            const isMatch = (0, bcrypt_1.compareSync)(password + user.password_salt, user.password_hash);
            if (!isMatch)
                return false;
            return { id: user._id, created_at: user.createdAt };
        }
        catch (error) {
            console.error("Error comparing user password:", error);
            return false;
        }
    });
}
exports.compareUserPassword = compareUserPassword;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield exports.User.findByIdAndDelete(id);
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user");
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(id, newUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield exports.User.findByIdAndUpdate(id, newUserData, { new: true });
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user");
        }
    });
}
exports.updateUser = updateUser;
function isValidEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return !!(yield exports.User.findOne({ email }));
        }
        catch (error) {
            console.error("Error validating email:", error);
            throw new Error("Failed to validate email");
        }
    });
}
exports.isValidEmail = isValidEmail;
function isValidUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return !!(yield exports.User.findOne({ username }));
        }
        catch (error) {
            console.error("Error validating username:", error);
            throw new Error("Failed to validate username");
        }
    });
}
exports.isValidUsername = isValidUsername;
