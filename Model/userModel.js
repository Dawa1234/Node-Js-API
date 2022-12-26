const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "User already exists."],
      minLength: [5, "Username too short."],
      maxLength: [20, "Username too long."],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userModel", userSchema);
