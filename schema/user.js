const mongoose = require("../config/db.js");

class UserSchema {
  constructor() {
    const schema = new mongoose.Schema({
      userName: { type: String, required: true },
      accountNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      emailAddress: { type: String, required: true, unique: true },
      identityNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
    });

    this.model = mongoose.model("User", schema);
  }

  getModel() {
    return this.model;
  }
}

module.exports = new UserSchema().getModel();
