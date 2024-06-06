import { Model, Schema, model } from 'mongoose';
import IInvitation from '../interfaces/invitation.interface';

const invitationSchema: Schema<IInvitation> = new Schema<IInvitation>({
  event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  invited_by: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  invited_user_email: { type: String, required: true },
  invitation_status: { type: String, default: 'sent' },
  invitation_sent_date: { type: Date, default: Date.now },
  barcode: { type: String, required: true, unique: true },
  barcode_scanned: { type: Boolean, default: false },
  scanned_at: { type: Date },
});

const Invitation: Model<IInvitation> = model<IInvitation>(
  'Invitation',
  invitationSchema
);

export default Invitation;
