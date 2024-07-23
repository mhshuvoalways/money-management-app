const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
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
    avatar: {
      url: String,
      publicId: String,
    },
    phone: {
      type: Number,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    plan: {
      type: String,
      default: "Basic",
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

module.exports = model("user", userModel);
