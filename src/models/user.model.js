import mongoose from "mongoose";

//User
     const  userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    role: { type: String, enum: ["USER", "ADMIN", "SUPERADMIN"], default: "USER" },

    phone: { type: String },
    status: { type: Boolean, default: true },

    media: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserMedia" }]
  },
  { timestamps: true }
);



  export const userMediaSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    url: { type: String, required: true },
    type: { type: String, enum: ["IMAGE", "DOC"], default: "IMAGE" },

    isPrimary: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default userSchema;
