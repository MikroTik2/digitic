const express = require("express");
const router = express.Router();
const { createProduct, getProduct, getAllProduct, uploadImages, rating, addToWishlist, updateProduct, deleteProduct } = require("../controller/productCtrl.js");
const { authMiddleware, isAdmin } = require("../middlwares/authMiddleware.js");
const { uploadPhoto, productImgResize } = require("../middlwares/uploadImages.js");

//post
router.post("/", authMiddleware, isAdmin, createProduct);

//get
router.get("/", getAllProduct);
router.get("/:id", getProduct);

//put
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImages );
router.put("/:id", authMiddleware, isAdmin, updateProduct);

//delete
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;