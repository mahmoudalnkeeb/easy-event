import { Model, Schema, model } from 'mongoose';
import IEvent from '../interfaces/event.interface';

const eventSchema: Schema<IEvent> = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number },
    image: { type: String },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event: Model<IEvent> = model<IEvent>('Event', eventSchema);

export default Event;
