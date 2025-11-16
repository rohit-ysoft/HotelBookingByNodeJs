import dotenv from "dotenv";

dotenv.config();

// REQUIRED env variables
const required = ["PORT", "MONGO_URI", "JWT_SECRET"];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

export const env = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || "development",
};
