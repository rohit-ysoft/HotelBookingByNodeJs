import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.routes.js";   // <-- ADD THIS

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(express.json());

// All Routes
app.use("/api", routes);

export default app;
