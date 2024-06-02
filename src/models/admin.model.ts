import { Model, Schema, model } from "mongoose";
import IAdmin from "../interfaces/admin.interface";

const adminSchema: Schema<IAdmin> = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  profile_picture: { type: String },
  account_created_at: { type: Date, default: Date.now },
});

const Admin: Model<IAdmin> = model<IAdmin>("Admin", adminSchema);

export default Admin;
