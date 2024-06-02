import { Document, ObjectId } from "mongoose";

export default interface IEvent extends Document {
  title: string;
  description: string;
  location: string;
  date: Date;
  time: string;
  capacity: number;
  price?: number;
  image?: string;
  created_by: ObjectId; // Assuming reference to user
}
