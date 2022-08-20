const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_image: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        subcategory_name: {
          type: String,
          required: true,
        },
        subcategory_image: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Category = mongoose.model("category", CategorySchema);
