import { Router } from "express";
import authRoutes from "./auth.routes.js";
import hotelroutes from "./hotel.routes.js";
import quotationRoutes from "./quotation.routes.js";
import quotationHotelRoutes from "./quotationHotel.routes.js";


const router = Router();

// Register all routes
router.use("/auth", authRoutes);
router.use("/hotel", hotelroutes);
router.use("/quotation", quotationRoutes);
router.use("/quotation-hotel", quotationHotelRoutes);


export default router;
