const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name:{
    type: String,
    ref: "userinfos",
  },
  posterid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userinfos",
  },
  caption: {
    type: String,
    //required: true,
  },
  imageUrl: {
    type: String,
    //required: true,
  },
  profileImageUrl: {
    type: String,
    //required: true,
    ref: "Profilepic",
  },

  visibility: {
    type: String,
    enum: ["public", "private"], // Define the possible visibility options
    default: "public", // Set a default visibility
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
