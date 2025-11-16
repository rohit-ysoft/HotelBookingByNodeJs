import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js";
import { env } from "../config/env.config.js";
import { ROLES } from "../constants/roles.js";

export class AuthService {
  static async register(data) {
    const { fullName, email, password, phone } = data;

    const exists = await user.findOne({ email });
    if (exists) throw new Error("Email already registered");

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      fullName,
      email,
      passwordHash,
      phone,
      role: ROLES.USER, // default Agent
    });

    return newUser;
  }

  static async login(data) {
    const { email, password } = data;

    const existingUser = await user.findOne({ email });
    if (!existingUser) throw new Error("Invalid credentials");

    const validPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!validPassword) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role, email },
      env.jwtSecret,
      { expiresIn: "7d" }
    );

    return { user: existingUser, token };
  }
}
