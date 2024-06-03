"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enrollmentSchema = new mongoose_1.Schema({
    event_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Event", required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    enrollment_date: { type: Date, default: Date.now },
    enrollment_status: { type: String, default: "confirmed" },
});
const Enrollment = (0, mongoose_1.model)("Enrollment", enrollmentSchema);
exports.default = Enrollment;
