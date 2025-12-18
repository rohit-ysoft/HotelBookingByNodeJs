import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPERADMIN"],
      default: "USER",
    },

    phone: { type: String },
    status: { type: Boolean, default: true },

  },
  { timestamps: true }
);

// IMPORTANT: Create a model
const User = mongoose.model("User", userSchema);

export default User;
