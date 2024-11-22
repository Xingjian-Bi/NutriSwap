import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  height: { type: Number },
  weight: { type: Number },
  bodyfat: { type: Number },
  age: { type: Number },
  gender: { type: String },
  preferences: { type: String },
  allergies: { type: String },
  targetWeight: { type: Number },
});


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profile: {
      type: userInfoSchema, // Embedding the userInfoSchema
      default: {}, // Default to an empty object if not provided
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
