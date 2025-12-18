import { Router } from "express";
import { QuotationController } from "./quotation.controller.js";

const router = Router();

router.post("/", QuotationController.create);
router.get("/", QuotationController.getAll);
router.get("/:id", QuotationController.getById);
router.put("/:id", QuotationController.update);
router.delete("/:id", QuotationController.remove);

export default router;
