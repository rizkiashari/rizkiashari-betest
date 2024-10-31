const UserModel = require("../../models/user.js");
const cache = require("../utils/Cache.js");
const AuthService = require("../services/auth.js");

class UserController {
  async createUser(req, res) {
    try {
      const token = AuthService.generateToken({
        accountNumber: req.body.accountNumber,
        identityNumber: req.body.identityNumber,
      });

      const user = await UserModel.createUser(req.body);
      res.status(201).json({
        message: "User created",
        data: user,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserModel.getUsers();
      res.status(200).json({
        data: users,
        message: "Users retrieved",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserByAccountNumber(req, res) {
    const { accountNumber } = req.params;
    const cacheKey = `user:${accountNumber}`;

    try {
      const cachedUser = await cache.get(cacheKey);
      if (cachedUser) return res.status(200).json(cachedUser);

      const user = await UserModel.getUserByAccountNumber(accountNumber);
      console.log("accountNumber: ", accountNumber);

      if (user) {
        await cache.set(cacheKey, user);
        return res.status(200).json({
          data: user,
          message: "User retrieved",
        });
      }
      res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserByIdentityNumber(req, res) {
    const { identityNumber } = req.params;
    const cacheKey = `user:${identityNumber}`;

    try {
      const cachedUser = await cache.get(cacheKey);
      if (cachedUser) return res.status(200).json(cachedUser);

      const user = await UserModel.getUserByIdentityNumber(identityNumber);
      if (user) {
        await cache.set(cacheKey, user);
        return res.status(200).json({
          data: user,
          message: "User retrieved",
        });
      }
      res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    const { accountNumber } = req.params;
    try {
      const user = await UserModel.updateUser(accountNumber, req.body);
      if (user)
        return res.status(200).json({
          data: user,
          message: "User updated",
        });
      res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    const { accountNumber } = req.params;
    try {
      const user = await UserModel.deleteUser(accountNumber);
      if (user) return res.status(200).json({ message: "User deleted" });
      res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
