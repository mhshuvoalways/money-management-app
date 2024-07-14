const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const walletModel = new Schema(
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
      min: 6,
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

module.exports = model("wallet", walletModel);
