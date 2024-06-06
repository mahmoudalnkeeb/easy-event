import { Model, Schema, model } from 'mongoose';
import IAdmin from '../interfaces/admin.interface';
import { AdminSignup } from '../interfaces/auth.interface';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import envConfig from '../config/env.config';

const adminSchema: Schema<IAdmin> = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  password_salt: {
    type: String,
    required: true,
  },

  profile_pic: {
    url: {
      type: String,
      required: true,
      default: 'default:avatar',
    },
    secure_url: {
      type: String,
      required: true,
      default: 'default:avatar',
    },
    metadata: {
      height: Number,
      width: Number,
      bytes: Number,
      format: String,
      public_id: String,
      asset_id: String,
    },
  },
  access_level: {
    type: String,
    enum: ['ADMIN', 'SUPER_ADMIN', 'ATTENDANCE_MANAGER'],
  },
  account_created_at: { type: Date, default: Date.now },
});

export const Admin: Model<IAdmin> = model<IAdmin>('Admin', adminSchema);

export async function validateEmail(email: string) {
  return !!(await Admin.findOne({ email }));
}

export async function validateUsername(username: string) {
  return !!(await Admin.findOne({ username }));
}

export async function createAdmin({
  email,
  password,
  username,
  access_level = 'ADMIN',
}: AdminSignup) {
  const password_salt = genSaltSync(envConfig.rounds);
  const password_hash = hashSync(password + password_salt, password_salt);
  const adminData = {
    email,
    username,
    password_hash,
    password_salt,
    access_level,
  };
  const admin = await Admin.create(adminData);
  return {
    username: admin.username,
    created_at: admin.account_created_at,
  };
}

export async function compareAdminPassword(
  password: string,
  { username, email }: { username?: string; email?: string }
): Promise<boolean | { id: Schema.Types.ObjectId }> {
  try {
    if (!username && !email) return false;
    const admin = await Admin.findOne(email ? { email } : { username });
    if (!admin) return false;
    const isMatch = compareSync(
      password + admin.password_salt,
      admin.password_hash
    );
    if (!isMatch) return false;
    return { id: admin._id };
  } catch (error) {
    console.error('Error comparing user password:', error);
    return false;
  }
}
