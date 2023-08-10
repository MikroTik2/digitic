const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let blogSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true,
    },
    description:{
      type:String,
      required:true,
    },
    category:{
      type:String,
      required:true,
    },
    numViews:{
      type:Number,
      default: 0,
    },
    isLiked:{
      type:Boolean,
      default: false,
    },
    isDisliked:{
      type:Boolean,
      default:false,
    },
     
    image:{
      type:String,
      default: "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?q=10&h=200",
    },

    author:{
      type:String,
      default: "admin",
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);