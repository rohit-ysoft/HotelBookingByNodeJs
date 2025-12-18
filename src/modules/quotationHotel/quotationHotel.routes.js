import { Router } from "express";
import { QuotationHotelController } from "./quotationHotel.controller.js";

const router = Router();

router.post("/", QuotationHotelController.create);
router.get("/:quotationId", QuotationHotelController.getByQuotation);
router.get("/single/:id", QuotationHotelController.getById);
router.put("/:id", QuotationHotelController.update);
router.delete("/:id", QuotationHotelController.remove);

export default router;
