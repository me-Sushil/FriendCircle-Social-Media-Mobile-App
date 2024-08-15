const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({


  //_id: mongoose.Schema.Types.ObjectId,

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userinfos",
  },
  recepientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userinfos",
  },
  messageType: {
    type: String,
    enum: ["text", "image"],
  },
  message: String,
  imageUrl: String,
  
  isSeen: {
    type: Boolean,
    default: false,
  },
  seenAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
  
  timeStamp: {
    type: Date,
    default: Date.now,
  },
},
{ versionKey: false });
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;


