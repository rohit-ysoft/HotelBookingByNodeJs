import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // logging

// API Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorMiddleware);

export default app;
