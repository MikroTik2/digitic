const User = require("../models/userModel.js");
const Cart = require("../models/cartModel.js");
const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validateMongoDbId = require("../utils/validateMongoDbId.js");
const sendEmail = require("../controller/emailCtrl.js");
const { generateToken } = require("../config/jwtToken.js");
const { generateRefreshToken } = require("../config/refreshToken.js");

//create a user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("user already exists");
  };
});

//login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {

    const refreshToken = await generateRefreshToken(findUser?.id);
    const updateUser = await User.findByIdAndUpdate(findUser.id, {
      refreshToken: refreshToken,
    }, { new: true });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    }),

    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });

  } else {
    throw new Error("invalid credentials");
  }
});

// login a admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });

  if (findAdmin.role !== "admin") throw new Error("not autorized!");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
 
    const refreshToken = await generateRefreshToken(findAdmin?.id);
    const updateUser = await User.findByIdAndUpdate(findAdmin.id, {
      refreshToken: refreshToken,
    }, { new: true });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });

  } else {
    throw new Error("invalid credentials");
  }
});

//save user address
const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {

    const updateUser = await User.findByIdAndUpdate(_id, {
      address: req?.body?.address,
    }, { new: true });

    res.json(updateUser);

  } catch (error) {
    throw new Error(error);
  };
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("no refresh token in cookies");

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) throw new Error("no refresh token present in db or not matched");

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("there is something wrong with refresh token");
    };

    const accesstoken = generateToken(user?._id);

    res.json({ accesstoken });
  });
});

//logout functionallity
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("no refresh token in cookies");

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    return res.sendStatus(204); // forbidden

  };

  await User.findOneAndUpdate({ refreshToken }, {
    refreshToken: "",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  res.sendStatus(204); // forbidden

});

// cart a user
const cartUser = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    let products = [];
    const user = await User.findById(_id);

    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });

    if (alreadyExistCart) {
      alreadyExistCart.remove();
    };

    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;

      let getPrice = await Product.findById(cart[i]._id).select("price").exec();

      object.price = getPrice.price;
      products.push(object);

    };
    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    };

    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//get a user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const findUser = await User.findById(id);
    res.json(findUser);

  } catch (error) {
    throw new Error(error);
  };
})

//get all a user
const getAllUser = asyncHandler(async (req, res) => {
  try {

    const findAllUser = await User.find();
    res.json(findAllUser);

  } catch (error) {
    throw new Error(error);
  };
});

//get a wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

//update a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {

    const updateUser = await User.findByIdAndUpdate(_id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
    }, { new: true });

    res.json(updateUser);

  } catch (error) {
    throw new Error(error);
  };
});

//update a password
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);

  const user = await User.findById(_id);

  if (password) {
    user.password = password;

    const updatePassword = await user.save();
    res.json(updatePassword);
  } else {
    res.json(user);
  };
});

//forgot password token
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error("user not found with this");

  try {

    const token = await user.createPasswordResetToken();
    await user.save();

    const resetURL = `hi, please follow this link to reset your password. this link is valid till 10 minutes from now. <a href="http://localhost:4000/api/user/reset-password/${token}">Click here</a>`

    const data = {
      to: email,
      text: "hey user!",
      subject: "forgot password link",
      html: resetURL,
    }

    sendEmail(data);

    res.json(token);

  } catch (error) {
    throw new Error(error);
  };
});

//reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("token expired, please try again later"); 

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.json(user);
});

//block a user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const block = await User.findByIdAndUpdate(id, {
      isBlocked: true,
    }, { new: true });
    
    res.json(block);

  } catch (error) {
    throw new Error(error);
  };
});

//unblock a user
const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const unBlock = await User.findByIdAndUpdate(id, {
      isBlocked: false,
    }, { new: true });

    res.json(unBlock);

  } catch (error) {
    throw new Error(error);
  };
});

//delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);

  } catch (error) {
    throw new Error(error);
  };
})


module.exports = { createUser, loginUser, loginAdmin, cartUser, saveAddress, handleRefreshToken, getWishlist, forgotPasswordToken, resetPassword, logout, getAllUser, getUser, updateUser, updatePassword, blockUser, unBlockUser, deleteUser };