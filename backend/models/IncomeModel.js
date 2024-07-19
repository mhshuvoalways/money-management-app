const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const incomeModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    category: {
      type: Types.ObjectId,
      ref: "category",
    },
    wallet: {
      type: Types.ObjectId,
      ref: "wallet",
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("income", incomeModel);
