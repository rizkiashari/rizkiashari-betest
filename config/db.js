const mongoose = require("mongoose");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

try {
  mongoose.connect(env.DB_URL);
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database");
  console.error(error);
}

module.exports = mongoose;
