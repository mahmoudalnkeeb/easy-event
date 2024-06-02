import { Model, Schema, model } from "mongoose";
import INotification from "../interfaces/notification.interface";

const notificationSchema: Schema<INotification> = new Schema<INotification>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

const Notification: Model<INotification> = model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
