const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
    },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
