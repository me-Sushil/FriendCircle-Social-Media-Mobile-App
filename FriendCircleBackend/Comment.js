const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  userId: { type: String, required: true, ref: "userinfos" },
  name: { type: String, required: true, ref: "userinfos" },
  profileImageUrl: { type: String, required: true, ref: "Profilepic" },
  postId: { type: String, required: true, ref: "Post" },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
