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
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userModel);
