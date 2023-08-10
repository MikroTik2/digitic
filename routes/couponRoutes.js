const express = require("express");
const router = express.Router();
const { createCoupon, getAllCoupon, getCoupon, updateCoupon, deleteCoupon } = require("../controller/couponCtrl.js");
const { isAdmin, authMiddleware } = require("../middlwares/authMiddleware.js");

//post
router.post("/", authMiddleware, isAdmin, createCoupon);

//get
router.get("/", authMiddleware, isAdmin,  getAllCoupon);
router.get("/:id", authMiddleware, isAdmin,  getCoupon);

//put
router.put("/:id", authMiddleware, isAdmin,  updateCoupon);

//delete
router.delete("/:id", authMiddleware, isAdmin,  deleteCoupon);

module.exports = router;