const mongoose = require("../config/db");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true, index: true },
  emailAddress: { type: String, required: true, unique: true },
  identityNumber: { type: String, required: true, unique: true, index: true },
});

module.exports = mongoose.model("User", userSchema);
