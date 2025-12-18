// routes/hotelFacility.routes.js
import express from "express";
import { uploadHotelFacility } from "../../middleware/upload.middleware.js";
import {
  addFacility,
  getHotelFacilities,
  getSingleFacility,
  editFacility,
  removeFacility
} from "../controllers/hotelFacility.controller.js";

const router = express.Router();


// router.post(
//   "/register",
//   uploadHotelFacility.array("images", 10),  // ⭐ VERY IMPORTANT
//   HotelController.create
// );
// Create Facility
router.post(
  "/register", 
  uploadHotelFacility.array("images", 10),
 addFacility
);

// Get all facilities of one hotel
router.get("/hotel/:hotelId", getHotelFacilities);

// Get single facility by id
router.get("/:id", getSingleFacility);

// Update facility
router.put("/:id", editFacility);

// Delete facility
router.delete("/:id", removeFacility);

export default router;
