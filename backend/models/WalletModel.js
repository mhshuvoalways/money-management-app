const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const walletModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "auth",
    },
    walletName: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("wallet", walletModel);
