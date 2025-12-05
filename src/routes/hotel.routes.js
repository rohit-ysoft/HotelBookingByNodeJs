import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller.js";
import { upload } from "../middleware/upload.js";
const router = Router();


router.post(
  "/register",
  upload.array("images", 10),  // ⭐ VERY IMPORTANT
  HotelController.create
);
// router.post("/register", HotelController.create);
router.get("/getbyId", HotelController.getById);
router.get("/", HotelController.getAll);
router.put("/hotelEdit", HotelController.update);
router.delete("/:id", HotelController.remove);

export default router;
