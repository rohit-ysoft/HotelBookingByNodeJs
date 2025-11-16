import app from "./app.js";
import { env } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";
import { logger } from "./config/logger.config.js";

// Connect MongoDB
connectDB();

// Start server
app.listen(env.port, () => {
  logger.info(`🚀 Server running at http://localhost:${env.port}`);
});
