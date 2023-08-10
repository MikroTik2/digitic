const express = require("express");
const router = express.Router();
const { createBrand, getAllBrand, getBrand, updateBrand, deleteBrand } = require("../controller/brandCtrl.js");

//post
router.post("/", createBrand);

//get
router.get("/", getAllBrand);
router.get("/:id", getBrand);

//put
router.put("/:id", updateBrand);

//delete
router.delete("/:id", deleteBrand);

module.exports = router;