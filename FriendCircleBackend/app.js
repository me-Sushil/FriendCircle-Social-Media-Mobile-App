//Environment Variables Setup
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser"); //new impliment for email authentication
//const nodemailer = require("nodemailer"); //new impliment for email authentication
const multer = require("multer");
const cors = require("cors"); //new impliment for email authentication
const path = require("path"); //Added for image upload

// Middleware
const port = 5002; //new impliment for email authentication
app.use(cors()); //new impliment for email authentication
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true })); //new impliment for email authentication
app.use(bodyParser.json()); //new impliment for email authentication
app.use(express.json());

// Environment Variables
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log(`Email User: ${emailUser}`);
console.log(`Email Password: ${emailPass}`);
const mongoUrl =
  "mongodb+srv://admin:admin@cluster0.lhfaswf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET = "ihuwefnincdijiu()iuhfiufni[]]cnjdhcihc";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

//Models
const UserInfo = require("./UserDetails"); //add for message feature
const Message = require("./message"); //add for message feature

const Profilepic = require("./Profilepic");
const Comment = require("./Comment");

//Like related import

const likeRoutes = require("./routes/likeRoutes");

// Routes
app.use("/likes", likeRoutes);

//all post realted code is here
const Post = require("./Post");
const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//end of post code

require("./UserDetails");
const User = mongoose.model("userinfos");

app.get("/", (req, res) => {
  res.send({ status: "Startrd" });
});

app.post("/register", async (req, res) => {
  const { name, gender, email, password } = req.body;

  // Debugging statements
  console.log("Name:", name);
  console.log("Gender:", gender);
  console.log("Email:", email);
  console.log("Password:", password);
  //console.log('Image:', image);

  const oldUser = await UserInfo.findOne({ email: email });
  if (oldUser) {
    return res.send({ data: "User already exists!!" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const otpToken = jwt.sign({ email, otp }, JWT_SECRET, { expiresIn: "1d" });

  try {
    const newUser = await UserInfo.create({
      name: name,
      email: email,
      gender: gender,
      password: encryptedPassword,
      otp: otp, // Save OTP
      otpToken: otpToken,
    }); // Save OTP token

    //newUser.save(); // added for image

    await sendOtpEmail(email, otp); // Send OTP email
    res.send({
      status: "ok",
      data: "User Created . Verify your email using the OTP sent.",
    });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

console.log("email", emailUser);
// Send the verification email to the user
const sendOtpEmail = async (email, otp) => {
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
  const mailOptions = {
    from: emailUser,
    to: email,
    subject: "Email Verification",
    text: `Your OTP for email verification is: ${otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await UserInfo.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error verifying OTP", error);
    res.status(500).json({ message: "Email verification failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await UserInfo.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error getting token", error);
    res.status(500).json({ message: "Email verification failed" });
  }
});

app.post("/login-user", async (req, res) => {
  //  const { name, gender, email, password } = req.body;
  const { email, password } = req.body;

  const oldUser = await UserInfo.findOne({ email: email });
  if (!oldUser) {
    return res.send({ data: "User does not exist!!" });
  }
  if (!oldUser.verified) {
    return res.send({ data: "Please verify your email to log in." });
  }

  console.log(oldUser, "old user");

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign(
      {
        //name: oldUser.name,
        //gender: oldUser.gender,
        email: oldUser.email,
        userId: oldUser._id,
      },
      JWT_SECRET
    );

    if (res.status(201)) {
      return res.send({ status: "ok", data: token });
    } else {
      return res.send({ error: "error" });
    }
  } else {
    return res.send({ error: "Invalid credentials" });
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    UserInfo.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: "Invalid token" });
  }
});

app.post("/profile", async (req, res) => {
  const { name, gender, email } = req.body;

  const detail = await UserInfo.findOne({
    name: name,
    email: email,
    gender: gender,
  });
  if (detail) {
    return res.send({ data: name, email, gender });
  } else {
    return res.send({ error: "Profile not found" });
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

//endpoint to access all the users except the user who's is currently logged in !

app.get("/users/:userId", async (req, res) => {
  const loggedInUserId = req.params.userId;
  console.log(loggedInUserId, "loggedInId");
  try {
    const users = await User.find({ _id: { $ne: loggedInUserId } });

    res.status(200).json(users);
  } catch (err) {
    console.log("Error retrieving users", err);
    res.status(500).json({ message: "Error retieving users" });
  }
});

//this is for profile to get name email gender
app.get("/userr/:userId", async (req, res) => {
  try {
    const user = await User.findById(
      req.params.userId,
      " name email gender"
    ).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
    console.log(user, "this is user data from database");
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

//  verify token and get user info
app.post("/verify-token", (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const username = user.name;
    const useremail = user.email;
    const usergender = user.gender;

    UserInfo.findOne({ name: username, email: useremail, gender: usergender })
      .then((data) => {
        res.send({ status: "Ok", data: data });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving user info", error: err });
      });
  } catch (error) {
    res.status(400).send({ error: "Invalid token" });
  }
});

////end point to send a request to a user
app.post("/friend-request", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  try {
    ////update the recepient's friendRequestsArray! friendRequests
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    ////update the sender's sentFriendRequests Array! sentFriendRequests
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });
    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Error sending friend request" });
  }
});

// Add a new endpoint to cancel a friend request
app.post("/friend-request/cancel", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  try {
    // Remove the friend request from the recipient's friendRequests array
    await User.findByIdAndUpdate(selectedUserId, {
      $pull: { friendRequests: currentUserId },
    });

    // Remove the friend request from the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $pull: { sentFriendRequests: selectedUserId },
    });

    res.status(200).json({ message: "Friend request cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling friend request:", error);
    res.status(500).json({ message: "Error cancelling friend request" });
  }
});

app.get("/friend-request/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user document based on the User id
    const user = await User.findById(userId).lean();
    const friendRequests = await User.find({
      _id: { $in: user.friendRequests },
    }).lean();

    // Fetch profile pictures for friend requests
    const friendRequestWithProfilePics = await Promise.all(
      friendRequests.map(async (friends) => {
        const profilePic = await Profilepic.findOne({ posterid: friends._id }).sort({ createdAt: -1 });
        return {
          ...friends,
          profileImageUrl: profilePic ? profilePic.profileImageUrl : null,
        };
      })
    );

    res.json(friendRequestWithProfilePics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//end point to accept a friend request of a particular person
app.post("/friend-request/accept", async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;
    console.log(senderId, "this is sender id");
    console.log(recepientId, "this is recepient id");
    //retrieve the documents of sender and the recipient
    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    if (!sender || !recepient) {
      return res.status(404).json({ message: "Sender or recipient not found" });
    }
    if (!sender.friends) sender.friends = [];
    if (!recepient.friends) recepient.friends = [];

    sender.friends.push(recepientId);
    recepient.friends.push(senderId);

    recepient.friendRequests = recepient.friendRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recepientId.toString()
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log(error, "Accept friend request error");
    res
      .status(500)
      .json({ message: "Internal server Error of Friend request accept" });
  }
});

//end point to access all friends of the logined in user
app.get("/accepted-friends/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId, "this is logedIn user id");

    if (!userId || userId === "null") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).populate(
      "friends",
      "_id name email"
    ); //image
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const acceptedFriends = user.friends;
    //start
    // Fetch profile pictures for accepted friends
    const acceptedFriendsWithProfilePics = await Promise.all(
      acceptedFriends.map(async (friends) => {
        const profilePic = await Profilepic.findOne({
          posterid: friends._id,
        }).sort({ createdAt: -1 });
        return {
          ...friends.toObject(),
          profileImageUrl: profilePic ? profilePic.profileImageUrl : null,
        };
      })
    );

    res.json(acceptedFriendsWithProfilePics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//end

//endpoint to post message and store it in the backend
app.post("/messages", async (req, res) => {
  try {
    const { senderId, recepientId, messageType, message, image } = req.body;

    console.log("Received daata:", req.body);

    if (!senderId || !recepientId) {
      return res
        .status(400)
        .json({ error: "Sender ID and Recepient ID are required" });
    }

    const newMessage = new Message({
      senderId,
      recepientId,
      messageType,
      message: messageType === "text" ? message : null,
      imageUrl: messageType === "image" ? image : null,
      imageUrl: image,
      timestamp: new Date(),
    });

    await newMessage.save();
    res
      .status(200)
      .json({ success: true, message: "Message sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//END

//endpoint to get the userDetails to design the chat Room header
app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId, "this is from back end Userid");
    //fetch the user data from the user Id
    const recepientId = await User.findById(userId);
    console.log("this is receipent id from back end", recepientId);
    res.json(recepientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const ObjectId = mongoose.Types.ObjectId;
//endpoint to fetch the messages between two user inthe chat room
app.get("/messages/:senderId/:recepientId", async (req, res) => {
  try {
    const { senderId, recepientId } = req.params;
    console.log(senderId, "this is backend sender id");

    // Check if senderId and recepientId are valid ObjectIds
    if (!ObjectId.isValid(senderId) || !ObjectId.isValid(recepientId)) {
      return res.status(400).json({ error: "Invalid sender or recipient ID" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: senderId, recepientId: recepientId },
        { senderId: recepientId, recepientId: senderId },
      ],
    })
      .populate("senderId", "_id name imageUrl")
      .populate("recepientId", "_id name imageUrl");

    res.json(messages);
    console.log(messages, "this is retrive from backend for message image");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//End points for message delete after seen
app.patch("/messagesa/:messageId/seen", async (req, res) => {
  try {
    const { messageId } = req.params;
    const seenAt = new Date();
    const expiresAt = new Date(seenAt.getTime() + 10000); // 10 seconds later

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      {
        isSeen: true,
        seenAt: seenAt,
        expiresAt: expiresAt,
      },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ success: true, message: "Message marked as seen" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const cron = require("node-cron");

cron.schedule("* * * * * *", async () => {
  // Run every second for demonstration purposes
  try {
    const now = new Date();
    const result = await Message.deleteMany({ expiresAt: { $lte: now } });
    if (result.deletedCount > 0) {
      console.log(result.deletedCount);

      // console.log("Expired messages deleted:", result.deletedCount);
    }
    
    // console.log("Expired messages deleted 2");
  } catch (error) {
    console.log("Error deleting expired messages:", error);
  }
});

//end of message delete after seen

app.post("/profilepic", async (req, res) => {
  try {
    const { posterid, profileImageUrl } = req.body;
    console.log("Received daata:", req.body);
    if (!posterid || !profileImageUrl) {
      return res
        .status(400)
        .json({ error: "Sender ID and Recepient ID are required" });
    }
    if (!ObjectId.isValid(posterid)) {
      return res.status(400).json({ error: "Invalid posterid" });
    }
    const newProfile = new Profilepic({
      posterid: new ObjectId(posterid),
      profileImageUrl,
    });
    await newProfile.save();

    // Update the profileImageUrl in the Comment collection
    await Comment.updateMany(
      { userId: posterid },
      { $set: { profileImageUrl: profileImageUrl } }
    );

    res
      .status(200)
      .json({ success: true, message: "Profile create Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profilepic/:posterid", async (req, res) => {
  try {
    const { posterid } = req.params;

    console.log(posterid, "this is posterid from get backend");

    if (!ObjectId.isValid(posterid)) {
      return res.status(400).json({ error: "Invalid posterid" });
    }
    const profilepic = await Profilepic.findOne({
      posterid: new ObjectId(posterid),
    }).sort({ createdAt: -1 }); // Sort by creation date in descending order // Fetch all posts and sort by creation date
    res.status(200).json(profilepic);
    console.log(profilepic, "posts of profile picture mmm");
  } catch (error) {
    console.error(error, "this is error from backend post by id ");
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE endpoint to delete a post by ID
app.delete("/postss/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId, "this is post id from back");
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// this code for comment
// Define the POST route to add a new comment
app.post("/comments", async (req, res) => {
  const { comment, userId, name, postId } = req.body.commentData;

  if (!comment || !userId || !name || !postId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Fetch the most recent profile picture for the user
    const profilePic = await Profilepic.findOne({ posterid: userId }).sort({
      createdAt: -1,
    });
    const profileImageUrl = profilePic ? profilePic.profileImageUrl : null;

    const newComment = new Comment({
      comment,
      userId,
      name,
      profileImageUrl,
      postId,
    });
    await newComment.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
    console.log(comments, "this is comment get");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Endpoint to edit a post
app.put("/postsedit/:postId", async (req, res) => {
  const { postId } = req.params;
  const { caption, imageUrl, visibility } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.caption = caption || post.caption;
    post.imageUrl = imageUrl || post.imageUrl;
    post.visibility = visibility || post.visibility;

    await post.save();

    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Define the route to update the profile
app.put("/profile/edit", async (req, res) => {
  const { userId, name, email, gender, oldpass, newpass } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(oldpass, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }
    // Update user data
    user.name = name;
    user.email = email;
    user.gender = gender;

    if (newpass) {
      const hashedPassword = await bcrypt.hash(newpass, 10);
      user.password = hashedPassword; // Update with hashed password
    }
    await user.save();

    // Update the name field in the Post collection
    await Post.updateMany({ posterid: userId }, { $set: { name: name } });

    // Update the name field in the Comment collection
    await Comment.updateMany({ userId: userId }, { $set: { name: name } });

    res.json({ message: "Profile updated successfully", user: user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});



//  THIS CODE IS WRITE FOR TO GET PUBLIC POST OF USER TO VIEW USER PROFILE 
// Define the route for fetching posts
// app.get("postt/:posterid", async (req, res) => {
//   try {
//     const { posterid } = req.params;
//     const posts = await Post.find({ posterid, visibility: "public" }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(posts);
//     console.log(posts, "posts of profile picture");
//   } catch (error) {
//     console.error(error, "this is error from backend post by id ");
//     res.status(500).json({ message: "Server error" });
//   }
// });
