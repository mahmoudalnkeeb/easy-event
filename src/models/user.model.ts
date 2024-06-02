import { Model, Schema, model } from "mongoose";
import IUser from "../interfaces/user.interface";

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
      value: {
        type: String,
        required: true,
        unique: true,
      },
      verified: {
        type: Boolean,
        required: true,
        default: false,
      },
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
        default: "default:avatar",
      },
      secure_url: {
        type: String,
        required: true,
        default: "default:avatar",
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

const User: Model<IUser> = model("User", userSchema);

async function getUsers(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const users = await User.find({}, null, { skip, limit });
  return users;
}

async function getUser(id: string) {
  return await User.findById(id);
}

async function createUser(userData: IUser) {
  const newUser = new User(userData);
  const { _id, username, fullname, createdAt } = await newUser.save();
  return { _id, username, fullname, createdAt };
}

async function deleteUser(id: string) {
  return await User.findByIdAndDelete(id);
}

async function updateUser(id: string, newUserData: Partial<IUser>) {
  return await User.findByIdAndUpdate(id, newUserData);
}

export { User, getUser, getUsers, createUser, deleteUser, updateUser };
