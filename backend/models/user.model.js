import mongoose from "mongoose";

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
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
      favorites: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
          },
      ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
