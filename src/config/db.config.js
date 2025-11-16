import mongoose from "mongoose";
import { env } from "./env.config.js";
import { logger } from "./logger.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info("✅ MongoDB connected");
  } catch (err) {
    logger.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
