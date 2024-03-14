const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required."],
    },
    role: {
      type: String,
      enum: ["Admin", "Member"],
    },
    favourites: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
      },
    ],

    // paymentCard: {
    //   name: String,
    //   number: {
    //     type: Number,
    //   },
    //   expiry: {
    //     type: String,
    //   },
    //   cvv: {
    //     type: Number,
    //     maxlength: 3,
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
