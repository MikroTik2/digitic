const Blog = require("../models/blogModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId.js");

//create a blog
const createBlog = asyncHandler(async (req, res) => {
  try {

    const newBlog = await Blog.create(req.body);
    res.json(newBlog);

  } catch (error) {
    throw new Error(error);
  };
});

//get a blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(id, {
      $inc: { numViews: 1 }, 
    }, { new: true });
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//get all a blog
const getAllBlog = asyncHandler(async (req, res) => {
  try {

    const findAllBlog = await Blog.find();
    res.json(findAllBlog);

  } catch (error) {
    throw new Error(error);
  };
});

//updatea a blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updateBlog);

  } catch (error) {
    throw new Error(error);
  };
});

//like a blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // find the blog which you want to be liked
  const blog = await Blog.findById(blogId);

  // find the login user
  const loginUserId = req?.user?._id;

  // find if the user has liked the post
  const isLiked = blog?.isLiked;

  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {

    const blog = await Blog.findByIdAndUpdate(blogId, {
      $pull: { dislikes: loginUserId },
      isDisliked: false,
    }, { new: true });

    res.json(blog);

  };

  if (isLiked) {

    const blog = await Blog.findByIdAndUpdate(blogId, {
      $pull: { likes: loginUserId },
      isLiked: false,
    }, { new: true } );

    res.json(blog);

  } else {

    const blog = await Blog.findByIdAndUpdate(blogId, {
      $push: { likes: loginUserId },
      isLiked: true,
    }, { new: true });

    res.json(blog);

  };
});

//dislike a blog
const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // find the blog which you want to be liked
  const blog = await Blog.findById(blogId);

  // find the login user
  const loginUserId = req?.user?._id;

  // find if the user has liked the post
  const isDisliked = blog?.isDisliked;

  const alreadyLiked = blog?.likes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );

  if (alreadyLiked) {

    const blog = await Blog.findByIdAndUpdate(blogId, {
      $pull: { likes: loginUserId },
      isLiked: false,
    });

    res.json(blog);

  }

  if (isDisliked) {

    const blog = await Blog.findByIdAndUpdate(blogId, {
      $pull: { dislikes: loginUserId },
      isDisliked: false,
    });

    res.json(blog);

  } else {

    const blog = await Blog.findByIdAndUpdate(blogId, {
      $push: { dislikes: loginUserId },
      isDisliked: true,
    });

    res.json(blog);

  };
  
});

//delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);

  } catch (error) {
    throw new Error(error);
  };
});

module.exports = { createBlog, getBlog, getAllBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog }; 