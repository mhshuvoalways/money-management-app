const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const categoryModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "auth",
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    categoryType: {
      type: String,
      required: true,
    },
    icon: {
      emoji: {
        type: String,
        required: true,
      },
      bgColor: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("category", categoryModel);
