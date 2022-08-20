const mongoose = require("mongoose");
const Product = require("./Product");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Product,
    },
    quantity: {
      type: Number,
    },
    order_total: {
      type: Number,
    },
    payment_id: {
      type: Number,
    },
    payment_method: {
      type: String,
    },
    coupon: {
      type: String,
    },
    discount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order = mongoose.model("Order", OrderSchema);
