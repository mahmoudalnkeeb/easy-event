import { Document, ObjectId } from 'mongoose';
import { IProfilePic } from './user.interface';

export default interface IAdmin extends Document {
  _id?: ObjectId;
  username: string;
  email: string;
  password_hash: string;
  password_salt: string;
  account_created_at: Date;
  access_level: 'ADMIN' | 'SUPER_ADMIN' | 'ATTENDANCE_MANAGER';
  profile_pic: IProfilePic;
}
