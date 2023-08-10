const express = require("express");
const router = express.Router();
const { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require("../controller/categoryBlogCtrl.js");
const { isAdmin, authMiddleware } = require("../middlwares/authMiddleware.js");

//post
router.post("/", createCategory);

//get
router.get("/", getAllCategory);
router.get("/:id", getCategory);

//put
router.put("/:id", updateCategory);

//delete
router.delete("/:id", deleteCategory);

module.exports = router;