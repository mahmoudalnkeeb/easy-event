import { ObjectId, Document } from 'mongoose';

export default interface IEnrollment extends Document {
  event_id: ObjectId; // Assuming reference to event
  user_id: ObjectId; // Assuming reference to user
  enrollment_date: Date;
  enrollment_status: string;
}
