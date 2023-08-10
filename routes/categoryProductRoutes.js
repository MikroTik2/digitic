const express = require("express");
const router = express.Router();
const { createPCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require("../controller/categoryProductCtrl.js");

//post
router.post("/", createPCategory);

//get
router.get("/", getAllCategory);
router.get("/:id", getCategory);

//put 
router.put("/:id", updateCategory);

//delete
router.delete("/:id", deleteCategory);

module.exports = router;