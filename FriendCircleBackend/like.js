// models/like.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'userinfos',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
