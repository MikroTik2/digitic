const BCategory = require("../models/categoryBlogModel.js");
const asyncHandler = require("express-async-handler");

//create a category
const createCategory = asyncHandler(async (req, res) => {
  try {

    const newCategory = await BCategory.create(req.body);
    res.json(newCategory);

  } catch (error) {
    throw new Error(error);
  };
});

//get a category
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {

    const findCategory = await BCategory.findById(id);
    res.json(findCategory);

  } catch (error) {
    throw new Error(error);
  };
});

//get all a category
const getAllCategory = asyncHandler(async (req, res) => {
  try {

    const findAllCategory = await BCategory.find();
    res.json(findAllCategory);

  } catch (error) {
    throw new Error(error);
  };
});

//update a category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {

    const updateCategory = await BCategory.findByIdAndUpdate(id, req.body, { new: true } );
    res.json(updateCategory);

  } catch (error) {
    throw new Error(error);
  };
});

//delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {

    const deleteCategory = await BCategory.findByIdAndDelete(id);
    res.json(deleteCategory);

  } catch (error) {
    throw new Error(error);
  };
});

module.exports = { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory };