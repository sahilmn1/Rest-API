const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required!"],
    },

    price: {
      type: Number,
      required: [true, "Price is Required!"],
    },
    fetured: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    company: {
      type: String,
      enum: {
        values: ["apple", "mi", "samsung", "dell"],
        message: `{VALUE} is not supported`,
      },
    },
  },
  { collection: "testing" }
);

module.exports = mongoose.model("Product", productSchema);
