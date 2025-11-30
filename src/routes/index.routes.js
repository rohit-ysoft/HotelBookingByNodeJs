import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "../routes/user.routes.js";
import hotelRoutes from "../routes/hotel.routes.js";
import quotationRoutes from "../routes/quotation.routes.js";

const router = Router();

// Register all routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/hotels", hotelRoutes);
router.use("/quotations", quotationRoutes);

export default router;
