const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const profileModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "auth",
    },
    name: {
      type: String,
      required: true,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("profile", profileModel);
