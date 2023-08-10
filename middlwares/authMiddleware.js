const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// auth
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {

    token = req.headers.authorization.split(" ")[1];

    try {

      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);

        req.user = user;
        next();
      };

    } catch (error) {
      throw new Error("not authorized token expired, please login again");
    };

  } else {
    throw new Error("there is no attached to header");
  };
});

// admin
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });

  if (adminUser.role !== "admin") {
    throw new Error("you not is admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };