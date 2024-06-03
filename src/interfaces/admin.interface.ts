import { Document } from "mongoose";
import { IProfilePic } from "./user.interface";

export default interface IAdmin extends Document {
  username: string;
  email: string;
  password_hash: string;
  account_created_at: Date;
  access_level: "ADMIN" | "SUPER_ADMIN" | "ATTENDANCE_MANAGER";
  profile_pic: IProfilePic;
}