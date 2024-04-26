import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  shippingInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    street: {
      type: String,
      required: [true, "Street is required."],
      trim: true,
    },
    address2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required."],
      trim: true,
    },
    postCode: {
      type: String,
      required: [true, "Post code is required."],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required."],
      trim: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    taxPaid: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
  },
  orderStatus: {
    type: String,
    default: "Processing",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model("Order", orderSchema);

module.exports = Order;
