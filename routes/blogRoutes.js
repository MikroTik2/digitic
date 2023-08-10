const express = require("express");
const router = express.Router();
const { createBlog, getAllBlog, getBlog, updateBlog, likeBlog, dislikeBlog, deleteBlog } = require("../controller/blogCtrl.js");
const { authMiddleware, isAdmin } = require("../middlwares/authMiddleware.js");

//post
router.post("/", authMiddleware, isAdmin, createBlog);

//get
router.get("/", getAllBlog);
router.get("/:id", getBlog);

//put
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);

//delete
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;