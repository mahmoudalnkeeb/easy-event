import { Model, ObjectId, Schema, model } from 'mongoose';
import IUser from '../interfaces/user.interface';
import { UserSignup } from '../interfaces/auth.interface';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import envConfig from '../config/env.config';

const userSchema: Schema<IUser> = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    password_hash: {
      type: String,
      required: true,
    },
    password_salt: {
      type: String,
      required: true,
    },
    phone: {
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
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = model('User', userSchema);

export async function getUsers(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;
    const users = await User.find({}, null, { skip, limit });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function getUser(id: string) {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function createUser({
  fullname,
  email,
  password,
  username,
  phone,
}: UserSignup): Promise<{
  id: ObjectId;
  created_at: Date;
}> {
  const password_salt = genSaltSync(envConfig.rounds);
  const password_hash = hashSync(password + password_salt, password_salt);
  const userData = {
    fullname,
    email,
    username,
    phone,
    password_hash,
    password_salt,
  };
  const user = await User.create(userData);
  return {
    id: user._id,
    created_at: user.createdAt,
  };
}

export async function compareUserPassword(
  password: string,
  {
    username = null,
    email = null,
  }: { username?: string | null; email?: string | null }
): Promise<boolean | { id: Schema.Types.ObjectId; created_at: Date }> {
  try {
    if (!username && !email) return false;
    const user = await User.findOne(email ? { email } : { username });
    if (!user) return false;
    const isMatch = compareSync(
      password + user.password_salt,
      user.password_hash
    );
    if (!isMatch) return false;
    return { id: user._id, created_at: user.createdAt };
  } catch (error) {
    console.error('Error comparing user password:', error);
    return false;
  }
}

export async function deleteUser(id: string) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}

export async function updateUser(id: string, newUserData: Partial<IUser>) {
  try {
    return await User.findByIdAndUpdate(id, newUserData, { new: true });
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

export async function isValidEmail(email: string): Promise<boolean> {
  try {
    return !!(await User.findOne({ email }));
  } catch (error) {
    console.error('Error validating email:', error);
    throw new Error('Failed to validate email');
  }
}

export async function isValidUsername(username: string): Promise<boolean> {
  try {
    return !!(await User.findOne({ username }));
  } catch (error) {
    console.error('Error validating username:', error);
    throw new Error('Failed to validate username');
  }
}
