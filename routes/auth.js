const express = require("express");
const router = express.Router();
const auth = require("../middlewares/jwt_verification");
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

//* @route   GET api/auth
//* @desc    Get user
//* @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//* @route   Post api/auth
//* @desc    Authenticate and login user
//* @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email address").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }

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
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          let mailOptions = {
            from: process.env.MAIL_UESR,
            to: email,
            subject: "Logged in successfully: Grocery App",
            text: `Hi ${
              user.name
            },\n\nWe just detected a login into your account in Grocery Shop App.\n\nFrom: ${req.header(
              "user-agent"
            )}\n\nThanks! – Aditya T.`,
          };
          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              res.json({ Error: err });
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
    }
  }
);

module.exports = router;
