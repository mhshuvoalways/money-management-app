const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const profileModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("profile", profileModel);
