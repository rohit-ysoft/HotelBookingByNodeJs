import { UserService } from "../services/user.service.js";

export class UserController {
  static async profile(req, res) {
    try {
      const result = await UserService.getProfile(req.user.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const updated = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
