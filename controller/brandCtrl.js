const Brand = require("../models/brandModel.js");
const asyncHandler = require("express-async-handler");

//create a brand
const createBrand = asyncHandler(async (req, res) => {
  try {

    const newBrand = await Brand.create(req.body);
    res.json(newBrand);

  } catch (error) {
    throw new Error(error);
  };
});

//get a brand
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {

    const findBrand = await Brand.findById(id);
    res.json(findBrand);

  } catch (error) {
    throw new Error(error);
  };
});

//get all a brand 
const getAllBrand = asyncHandler(async (req, res) => {
  try {

    const findAllBrand = await Brand.find();
    res.json(findAllBrand);

  } catch (error) {
    throw new Error(error);
  };
});

//update a brand
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {

    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updateBrand);

  } catch (error) {
    throw new Error(error);
  };
});

//delete a brand 
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {

    const deleteBrand = await Brand.findByIdAndDelete(id, req.body, { new: true });
    res.json(deleteBrand);

  } catch (error) {
    throw new Error(error);
  };
});


module.exports = { createBrand, getAllBrand, getBrand, updateBrand, deleteBrand };