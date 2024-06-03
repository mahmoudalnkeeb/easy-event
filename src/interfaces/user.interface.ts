import { Document, ObjectId } from "mongoose";



interface IProfilePicMetadata {
  height?: number;
  width?: number;
  bytes?: number;
  format?: string;
  public_id: string;
  asset_id: string;
}

export interface IProfilePic {
  url: string;
  secure_url: string;
  metadata?: IProfilePicMetadata;
}

export default interface IUser extends Document {
  _id?: ObjectId;
  fullname: string;
  username: string;
  email: string;
  email_verified:boolean;
  password_hash: string;
  password_salt: string;
  phone: string;
  profile_pic: IProfilePic;
  createdAt: Date;
  updatedAt: Date;
}
