import { user } from "../models/user.model.js";

export class UserService {
  static async getProfile(userId) {
    return await user.findById(userId).populate("media");
  }

  static async getAllUsers() {
    return await user.find().select("-passwordHash").populate("media");
  }

  static async updateUser(id, data) {
    return await user.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteUser(id) {
    return await user.findByIdAndDelete(id);
  }
}
