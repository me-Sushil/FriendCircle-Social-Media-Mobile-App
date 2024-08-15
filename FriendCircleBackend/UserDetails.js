const mongoose= require("mongoose");

const UserDetailsSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
},
gender:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
otp: { type: String },
otpToken: { type: String },
verified: { type: Boolean, default: false },

friendRequests:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"userinfos",
    },
],
friends:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"userinfos",
    },
],
sentFriendRequests:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"userinfos",
    },
],

});
const userinfons = mongoose.model("userinfos", UserDetailsSchema);
module.exports = userinfons;