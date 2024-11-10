import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userId: String,
  socketId: String,
});

export const User = model("User", userSchema);
