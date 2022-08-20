const express = require("express");
const router = express.Router();
const auth = require("../middlewares/jwt_verification");
const Product = require("../models/Product");
const User = require("../models/User");
const Category = require("../models/Category");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

//* @route   GET api/products/getProductById
//* @desc    Get product by id
//* @access  Public
router.get(
  "/getProductById/:product_id",
  [[check("product_id", "product_id is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { product_id } = req.params;
      const product = await Product.findById({ _id: product_id });
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//* @route   POST api/products/addProduct
//* @desc    Create a product
//* @access  Private
router.post(
  "/addProduct",
  [
    auth,
    [
      check("name", "Product name is required").not().isEmpty(),
      check("brand", "Brand name is required").not().isEmpty(),
      check("price", "Product price is required").not().isEmpty(),
      check("product_details", "Product details are required").not().isEmpty(),
      check("images", "Product images required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newProduct = await new Product({ ...req.body });
      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//* @route   POST api/products/addReview
//* @desc    Add review to a product
//* @access  Private
router.post(
  "/addReview",
  [
    auth,
    [
      check("product_id", "product_id is required").not().isEmpty(),
      check("user_id", "User name is required").not().isEmpty(),
      check("rating", "ratings are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { product_id, user_id, review, rating } = req.body;
      const product = await Product.findById({ _id: product_id });
      const user = await User.findById({ _id: user_id });
      if (user && user._id == req.user.id) {
        product.reviews.push({
          username: user.name,
          avatar: user.avatar,
          review,
          rating,
        });
        await product.save();
        res.json(product);
      } else {
        throw {
          message: "Invalid request",
        };
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
);

//* @route   POST api/products/getCategories
//* @desc    Get all categories
//* @access  Public
router.get("/getCategories", async (req, res) => {
  try {
    const category = await Category.find({});
    // const newCategory = new Category({
    //   category_name: "Dairy, Bread & Eggs",
    //   category_image:
    //     "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=180/layout-engine/2022-05/Slice-1.png",
    //   subcategories: [
    //     {
    //       subcategory_name: "Vegetables",
    //       subcategory_image:
    //         "https://cdn.grofers.com/app/images/category/cms_images/icon/1489_1643613620694.png",
    //     },
    //   ],
    // });
    // await newCategory.save();
    res.json({
      status: true,
      message: "Categories Fetched Successfully",
      data: category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//* @route   POST api/products/getCategoryProducts
//* @desc    Get all products under a category
//* @access  Public
//! TODO: Integrate pagination
router.post(
  "/getCategoryProducts",
  [[check("subcategory_name", "category_name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { subcategory_name } = req.body;
      const products = await Product.find({
        "product_details.product_category": subcategory_name,
      });
      res.json({
        status: true,
        message: "Products Fetched Successfully",
        data: products,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
