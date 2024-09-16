const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const goalModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "auth",
    },
    goalName: {
      type: String,
      required: true,
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    saved: {
      type: Number,
      required: true,
    },
    contributions: [
      {
        contribution: {
          type: Number,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
      },
    ],
    contributionType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("goal", goalModel);
