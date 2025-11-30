import app from "./app.js";
import { env } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";

// Connect Database
connectDB();

// Start Server
app.listen(env.port, () => {
  console.log(`🚀 Server running at http://localhost:${env.port}`);
});
