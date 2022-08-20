const mongoose = require("mongoose");
const Product = require("./Product");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
        deafult: 1,
      },
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = Cart = mongoose.model("cart", CartSchema);
