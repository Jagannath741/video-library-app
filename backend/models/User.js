const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserId: { type: String, required: true, unique: true },
  UserName: String,
  Password: String,
  Email: String,
  Mobile: String
});

module.exports = mongoose.model("User", userSchema);
