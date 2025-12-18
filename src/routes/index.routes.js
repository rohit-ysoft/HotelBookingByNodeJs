import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import hotelroutes from "../modules/hotel/hotel.routes.js";
import quotationRoutes from "../modules/quotation/quotation.routes.js";
import quotationHotelRoutes from "../modules/quotationHotel/quotationHotel.routes.js";
import hotelFacilityRoutes from "../modules/hotelFacility/hotelFacility.routes.js"
import hotelSearchRoutes from "../modules/hotelSearch/hotelSearch.routes.js"



const router = Router();

// Register all routes
router.use("/auth", authRoutes);
router.use("/hotel", hotelroutes);
router.use("/quotation", quotationRoutes);
router.use("/quotation-hotel", quotationHotelRoutes);
router.use("/hotelFacility", hotelFacilityRoutes);
router.use("/hotelSearch", hotelSearchRoutes);

export default router;
