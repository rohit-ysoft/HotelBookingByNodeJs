import { Router } from "express";
import authRoutes from "./auth.routes.js";
import hotelroutes from "./hotel.routes.js";


const router = Router();

// Register all routes
router.use("/auth", authRoutes);
router.use("/hotel", hotelroutes);


export default router;
