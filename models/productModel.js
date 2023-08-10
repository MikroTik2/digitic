const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  description: {
    type: String,
    required: true,
  },

  
  brand: {
    type: String,
    required: true,
  },
  
  category: {
    type: String,
    required: true,
  },

  images: {
    type:Array,
  },

  price: {
    type:Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  sold: {
    type: Number,
    default: 0,
  },

  color: [],

  ratings: [{
    star: Number,
    comment: String,
    postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  }],

  totalrating: {
    type: String,
    default: 0,
  }, 

}, { timestamps: true } );

//Export the model
module.exports = mongoose.model('Product', productSchema);