const Coupon = require("../models/couponModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId.js");

//create a coupon
const createCoupon = asyncHandler(async (req, res) => {
    try {

        const createCoupon = await Coupon.create(req.body);
        res.json(createCoupon);

    } catch (error) {
        throw new Error(error);
    };
}); 

//get a coupon
const getCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const findCoupon = await Coupon.findById(id);
        res.json(findCoupon);

    } catch (error) {
        throw new Error(error);
    };
});

//get all a coupon
const getAllCoupon = asyncHandler(async (req, res) => {
    try {

        const findAllCoupon = await Coupon.find();
        res.json(findAllCoupon);

    } catch (error) {
        throw new Error(error);
    };
});

//update a coupon
const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCoupon);

    } catch (error) {
        throw new Error(error);
    };
});

//delete a coupon
const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {

        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon);

    } catch (error) {
        throw new Error(error);
    };
});

module.exports = { createCoupon, getAllCoupon, getCoupon, updateCoupon, deleteCoupon };