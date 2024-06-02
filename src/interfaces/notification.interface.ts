import { ObjectId, Document } from "mongoose";

export default interface INotification extends Document {
  user_id: ObjectId;
  type: string;
  message: string;
  read: boolean;
  created_at: Date;
}
