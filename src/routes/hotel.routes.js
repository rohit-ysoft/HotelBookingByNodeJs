import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller.js";

import { auth } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

import { validate } from "../middleware/validate.middleware.js";
import { createHotelSchema, updateHotelSchema } from "../validations/hotel.validation.js";

const router = Router();

// ⭐ Public (Agent/User/Admin/SuperAdmin)
router.get("/", auth, HotelController.getAll);
router.get("/:id", auth, HotelController.getById);

// ⭐ Admin + SuperAdmin only
router.post(
  "/",
  auth,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validate(createHotelSchema),
  HotelController.create
);

router.put(
  "/:id",
  auth,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validate(updateHotelSchema),
  HotelController.update
);

router.delete(
  "/:id",
  auth,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  HotelController.delete
);

// ⭐ Add media (Admin only)
router.post(
  "/:id/media",
  auth,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  HotelController.addMedia
);

export default router;
