const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/jwt_verification");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const config = require("config");
const nodemailer = require("nodemailer");

//* @route   POST api/users
//* @desc    Register user
//* @access  Public
router.post(
  "/",
  [
    check("username", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with at least six character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const { username, email, password, referrer_id } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
        return;
      }
      const avatar = gravatar.url(email, {
        s: "200", //Size
        r: "pg", // Rating
        d: "mm", //Default
      });
      user = new User({
        name: username,
        email,
        avatar,
        password,
        referred_by: referrer_id,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      const authObject = {
        service: "Gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      };

      console.log(authObject);
      let transporter = nodemailer.createTransport(authObject);

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          let mailOptions = {
            from: process.env.MAIL_UESR,
            to: email,
            subject: "Verify your email address: Grocery App",
            text: `Hi ${username},\n\nWe just need to verify your email address before you can start using Grocery App.\n\nVerify your email address:\n ${req.get(
              "origin"
            )}/verifyEmail/${token}\n\nThanks! – Aditya T.`,
          };
          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              res.json({ Error: err });
              throw err;
            } else {
              res.json({
                status: true,
                msg: "Email sent successfully",
                data: token,
              });
            }
          });
          if (err) throw err;
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      throw err;
    }
  }
);

//* @route   Post api/users/refer
//* @desc    Authenticate and login user
//* @access  Public
router.post(
  "/refer",
  [
    check("name", "Please provide a name").not().isEmpty(),
    check("referrer_id", "Please provide referrer_id").not().isEmpty(),
    check("referrer_name", "Please provide referrer_name").not().isEmpty(),
    check("email", "Please include a valid email address").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const { name, email, referrer_id, referrer_name } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [{ msg: "User already is registered" }],
        });
        return;
      }

      const authObject = {
        service: "Gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      };
      let transporter = nodemailer.createTransport(authObject);
      let mailOptions = {
        from: process.env.MAIL_UESR,
        to: email,
        subject: "You just got a invitation",
        text: `Hi ${name},\n\nYou just got an invitation to our Grocery App.\n\nFrom: ${referrer_name}\n\nClick on this link to register and avail 10% discount on your first order: ${req.get(
          "origin"
        )}/refer/${referrer_id}\n\nThanks! – Aditya T.`,
      };
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          res.json({ Error: err });
        } else {
          res.json({
            status: true,
            msg: "Email sent successfully",
          });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//* @route   Post api/users/addToCart
//* @desc    Add product to cart
//* @access  Private
router.post(
  "/addToCart",
  [
    auth,
    [
      check("product_id", "Please provide product_id").not().isEmpty(),
      check("quantity", "Please provide quantity").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const { product_id, quantity } = req.body;

    try {
      let cart = await Cart.findOne({ userId: req.user.id });
      let user = await User.findOne({ _id: req.user.id });
      let product = await Product.findOne({ _id: product_id });
      if (!product) {
        res.status(500).json({
          status: false,
          errors: [{ message: "Product not found" }],
        });
        return;
      }
      if (!user) {
        res.json({
          errors: [{ msg: "User not found" }],
        });
        return;
      }
      if (!cart) {
        //Create and assign cart to user
        cart = new Cart({
          userId: req.user.id,
          items: [],
          bill: 0,
        });
        await cart.save();
        await user.updateOne({ cart: cart._id });
      }
      if (cart.items.some((item) => item.product == product_id)) {
        let index = cart.items.findIndex((item) => item.product == product_id);
        cart.items[index].quantity = cart.items[index].quantity + quantity;
      } else {
        cart.items.push({
          product: product_id,
          quantity: quantity,
        });
      }
      cart.bill =
        cart.bill + (product.discounted_price ?? product.price) * quantity;
      await cart.save();
      res.json({
        status: true,
        message: "Item added to cart",
        data: cart,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//* @route   Post api/users/updateCart
//* @desc    Update cart contents
//* @access  Private
router.post(
  "/updateCart",
  [auth, [check("cart_data", "Please provide cart_data").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const { cart_data } = req.body;

    try {
      let cart = await Cart.findOne({ userId: req.user.id });
      let user = await User.findOne({ _id: req.user.id });
      if (!user) {
        res.json({
          errors: [{ msg: "User not found" }],
        });
        return;
      }
      if (!cart) {
        //Create and assign cart to user
        cart = new Cart({
          userId: req.user.id,
          items: [],
          bill: 0,
        });
        await cart.save();
        await user.updateOne({ cart: cart._id });
      }
      //Not exactly good for security but time is running out
      cart.items = cart_data.items;
      cart.bill = cart_data.bill;
      //A safer approach would be to send each add or remove event and update the bill amount here

      await cart.save();
      res.json({
        status: true,
        message: "Cart updated successfully",
        data: response,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
