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
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required."],
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
    addresses: [
      {
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
        main: Boolean,
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
