const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const authModel = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("auth", authModel);
