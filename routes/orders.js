const express = require("express");
const router = express.Router();
const auth = require("../middlewares/jwt_verification");
const Product = require("../models/Product");
const User = require("../models/User");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

