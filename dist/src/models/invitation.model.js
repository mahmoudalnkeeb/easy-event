"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const invitationSchema = new mongoose_1.Schema({
    event_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Event", required: true },
    invited_by: { type: mongoose_1.Schema.Types.ObjectId, ref: "Admin", required: true },
    invited_user_email: { type: String, required: true },
    invitation_status: { type: String, default: "sent" },
    invitation_sent_date: { type: Date, default: Date.now },
    barcode: { type: String, required: true, unique: true },
    barcode_scanned: { type: Boolean, default: false },
    scanned_at: { type: Date },
});
const Invitation = (0, mongoose_1.model)("Invitation", invitationSchema);
exports.default = Invitation;
