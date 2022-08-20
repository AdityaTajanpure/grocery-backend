const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
    },
    nutrients: {
      type: String,
    },
    tips: {
      type: String,
    },
    fssai: {
      type: String,
    },
    stocks_avail: {
      type: Number,
      default: 0,
    },
    recommendation_criteria: {
      type: String,
      default: "NA",
    },
    discounted_price: {
      type: Number,
      default: 0,
    },
    product_details: {
      shelf_life: {
        type: String,
      },
      marketed_by: {
        type: String,
        default: "NA",
      },
      manufacturer_details: {
        type: String,
        default: "NA",
      },
      country_of_origin: {
        type: String,
        default: "India",
      },
      product_category: {
        type: String,
        required: true,
      },
      seller: {
        type: String,
        default: "NA",
      },
      expiry_date: {
        type: String,
        default: "NA",
      },
      description: {
        type: String,
        default: "NA",
      },
      disclaimer: {
        type: String,
        default: "NA",
      },
    },
    images: [String],
    reviews: [
      {
        username: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          max: 5,
          min: 0,
        },
        review: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Product = mongoose.model("product", ProductSchema);
