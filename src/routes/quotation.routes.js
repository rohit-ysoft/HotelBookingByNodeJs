import { Router } from "express";
import { QuotationController } from "../controllers/quotation.controller.js";

import { auth } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

import { validate } from "../middleware/validate.middleware.js";
import { createQuotationSchema } from "../validations/quotation.validation.js";

const router = Router();

// Agent create quotation
router.post(
  "/",
  auth,
  authorizeRoles(ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN),
  validate(createQuotationSchema),
  QuotationController.create
);

// Agent: my quotations
router.get(
  "/mine",
  auth,
  authorizeRoles(ROLES.USER),
  QuotationController.mine
);

// Admin: all quotations
router.get(
  "/",
  auth,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  QuotationController.getAll
);

// Get by ID
router.get(
  "/:id",
  auth,
  QuotationController.getById
);

// Update markup
router.put(
  "/:id",
  auth,
  authorizeRoles(ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN),
  QuotationController.update
);

// Delete quotation
router.delete(
  "/:id",
  auth,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  QuotationController.delete
);

// Regenerate PDF
router.post(
  "/:id/regenerate-pdf",
  auth,
  QuotationController.regeneratePdf
);

export default router;
