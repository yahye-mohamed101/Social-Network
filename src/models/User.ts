import { Schema, model, Document, Types } from "mongoose";

// Define IUser as an interface that extends Document
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount?: number;
  createdAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email address"] 
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

const User = model<IUser>('User', UserSchema);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

export default User;
