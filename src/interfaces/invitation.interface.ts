import { ObjectId , Document } from "mongoose";

export default interface IInvitation extends Document {
  event_id: ObjectId; // Assuming reference to event
  invited_by: ObjectId; // Assuming reference to admin
  invited_user_email: string;
  invitation_status: string;
  invitation_sent_date: Date;
  barcode: string;
  barcode_scanned: boolean;
  scanned_at?: Date;
}