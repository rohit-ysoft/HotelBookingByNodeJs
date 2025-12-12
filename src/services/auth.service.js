import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  User  from "../models/user.model.js";
import { env } from "../config/env.config.js";
import { ROLES } from "../constants/roles.js";

export class AuthService {
  static async register(data) {
    
    const { fullName, email, password, phone } = data;
    // Validate unique email
    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already registered");

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      passwordHash,
      phone,
      role: ROLES.USER,
    });

    return newUser;
  }

static async login(data) {
  const { email, password } = data;

  // Default flag
  let isSuccess = false;
  let role = null;

  // Check user exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("Invalid credentials");
  }

  // Validate password
  const validPassword = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  // Create JWT token
  const token = jwt.sign(
    {
      id: existingUser._id,
      role: existingUser.role,
      email: existingUser.email
    },
    env.jwtSecret,
    { expiresIn: "7d" }
  );

  // Success
  isSuccess = true;
  role = existingUser.role

  return {
    isSuccess,
    role,
    token
  };
}

}
