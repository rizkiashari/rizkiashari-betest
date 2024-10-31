const User = require("../schema/user.js");

class UserModel {
  async createUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async getUsers() {
    return await User.find();
  }

  async getUserByAccountNumber(accountNumber) {
    return await User.findOne({ accountNumber });
  }

  async getUserByIdentityNumber(identityNumber) {
    return await User.findOne({ identityNumber });
  }

  async updateUser(accountNumber, data) {
    return await User.findOneAndUpdate(
      { accountNumber },
      { $set: data },
      { new: true }
    );
  }

  async deleteUser(accountNumber) {
    return await User.findOneAndDelete(
      { accountNumber },
      { useFindAndModify: false }
    );
  }
}

module.exports = new UserModel();
