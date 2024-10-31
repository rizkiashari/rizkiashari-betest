const User = require("../schema/user.js");
const joi = require("joi");

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
    const validField = joi.object({
      userName: joi.string().required(),
      accountNumber: joi.string().required(),
      emailAddress: joi.string().required(),
      identityNumber: joi.string().required(),
    });

    const { error } = validField.validate(data);

    if (error) return error;

    const user = await User.findOne({ accountNumber });
    if (user) {
      return await user.updateOne({
        userName: data.userName,
        accountNumber: data.accountNumber,
        emailAddress: data.emailAddress,
        identityNumber: data.identityNumber,
      });
    }

    return null;
  }

  async deleteUser(accountNumber) {
    const user = await User.findOne({ accountNumber });
    if (user) {
      return await user.deleteOne();
    }
    return null;
  }
}

module.exports = new UserModel();
