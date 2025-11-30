import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import  userSchema  from "../models/user.model.js";

const router = Router();

router.post("/register",  userSchema, AuthController.register);
router.post("/login", loginSchema, AuthController.login);

export default router;
