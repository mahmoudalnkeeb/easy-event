import { Document } from "mongoose";

export default interface IAdmin extends Document {
  username: string;
  email: string;
  password_hash: string;
  profile_picture?: string;
  account_created_at: Date;
}