"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number },
    image: { type: String },
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: "Admin", required: true },
}, {
    timestamps: true,
});
const Event = (0, mongoose_1.model)("Event", eventSchema);
exports.default = Event;
