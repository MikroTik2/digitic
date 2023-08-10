const express = require("express");
const router = express.Router();
const { createUser, saveAddress, cartUser, loginUser, loginAdmin, handleRefreshToken, resetPassword, logout, getWishlist, getAllUser, getUser, updateUser, updatePassword, blockUser, unBlockUser, deleteUser, forgotPasswordToken } = require("../controller/userCtrl.js");
const { authMiddleware, isAdmin } = require("../middlwares/authMiddleware.js");

//post
router.post("/register", createUser)  ;
router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);
router.post("/cart", authMiddleware, cartUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/reset-password/:token", resetPassword);

//get
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/refresh", handleRefreshToken);
router.get("/all-user", getAllUser);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getUser);

//put
router.put("/edit-user", authMiddleware, updateUser);
router.put("/password", authMiddleware, updatePassword);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

//delete
router.delete("/:id", deleteUser);

module.exports = router;
