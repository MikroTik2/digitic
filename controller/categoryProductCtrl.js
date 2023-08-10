const PCategory = require("../models/categoryProductModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId.js");

//create a category
const createPCategory = asyncHandler(async (req, res) => {
  try {

    const newCategory = await PCategory.create(req.body);
    res.json(newCategory);

  } catch (error) {
    throw new Error(error);
  };
});

//get a category
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const findCategory = await PCategory.findById(id);
    res.json(findCategory);

  } catch (error) {
    throw new Error(error);
  };
});

//get all a category
const getAllCategory = asyncHandler(async (req, res) => {
  try {

    const findAllCategory = await PCategory.find();
    res.json(findAllCategory);

  } catch (error) {
    throw new Error(error);
  };
});

//update a category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const updateCategory = await PCategory.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updateCategory);

  } catch (error) {
    throw new Error(error);
  };
});

//delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {

    const deleteCategory = await PCategory.findByIdAndDelete(id);
    res.json(deleteCategory);

  } catch (error) {
    throw new Error(error);
  };
});

module.exports = { createPCategory, getCategory, getAllCategory, updateCategory, deleteCategory };