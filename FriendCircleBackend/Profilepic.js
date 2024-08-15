const mongoose = require("mongoose");

const ProfilepicSchema = new mongoose.Schema({
 
  posterid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userinfos",
  },
  
  profileImageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

const Profilepic = mongoose.model("Profilepic", ProfilepicSchema);

module.exports = Profilepic;
