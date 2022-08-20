const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Address = require("./Address");
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
    recommendation_type: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    addresses: [
      {
        address_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "address",
        },
      },
    ],
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    referred_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "cart",
    },
    subscriptions: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less then 1."],
          deafult: 1,
        },
      },
    ],
    wishlisted_products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", UserSchema);
