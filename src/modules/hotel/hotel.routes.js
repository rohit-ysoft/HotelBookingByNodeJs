import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller.js";
import { uploadHotel } from "../../middleware/upload.middleware.js";
const router = Router();


router.post(
  "/register",
  uploadHotel.array("images", 10),  // ⭐ VERY IMPORTANT
  HotelController.create
);
// router.post("/register", HotelController.create);
router.get("/getbyId", HotelController.getById);
router.get("/", HotelController.getAll);
router.put("/hotelEdit", HotelController.update);
router.delete("/:id", HotelController.remove);

export default router;
