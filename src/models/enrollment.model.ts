import { Model, Schema, model } from 'mongoose';
import IEnrollment from '../interfaces/enrollment.interface';

const enrollmentSchema: Schema<IEnrollment> = new Schema<IEnrollment>({
  event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  enrollment_date: { type: Date, default: Date.now },
  enrollment_status: { type: String, default: 'confirmed' },
});

const Enrollment: Model<IEnrollment> = model<IEnrollment>(
  'Enrollment',
  enrollmentSchema
);

export default Enrollment;
