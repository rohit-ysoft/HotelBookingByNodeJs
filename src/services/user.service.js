import userSchema from "../models/user.model.js";

export class UserService {
  static async getProfile(userId) {
    return await userSchema.findById(userId).populate("media");
  }

  static async getAllUsers() {
    return await userSchema.find().select("-passwordHash").populate("media");
  }

  static async updateUser(id, data) {
    return await userSchema.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteUser(id) {
    return await userSchema.findByIdAndDelete(id);
  }
}
