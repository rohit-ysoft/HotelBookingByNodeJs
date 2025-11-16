import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

// Profile for logged-in user
router.get("/profile", auth, UserController.profile);

// Admin + SuperAdmin Only
router.get("/", auth, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), UserController.getAll);

// Admin + SuperAdmin Edit users
router.put("/:id", auth, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), UserController.update);

// Only SuperAdmin can delete users
router.delete("/:id", auth, authorizeRoles(ROLES.SUPERADMIN), UserController.delete);

export default router;
