const express = require("express");
const Profilepic = require("../Profilepic");
const Post = require("../Post"); // Adjust the path as needed

const router = express.Router();



  router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body);
   

    const {name, posterid, caption, imageUrl, profileImageUrl, visibility } = req.body;

    const newPost = new Post({
      name,
      posterid,
      caption: caption || '',
      imageUrl,
      profileImageUrl,
      visibility,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
    console.log(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Define the route for fetching posts
router.get("/:posterid", async (req, res) => {
  try {
    const posts = await Post.find({ posterid: req.params.posterid }).sort({
      createdAt: -1,
    }); // Fetch all posts and sort by creation date
    res.status(200).json(posts);
    console.log(posts,"posts of profile picture");
  } catch (error) {
    console.error(error,"this is error from backend post by id ");
    res.status(500).json({ message: "Server error" });
  }
});


//this code is only for get post with first profile pic it not update profile pic
router.get("/public/:posterid", async (req, res) => {
  try {
    const posts = await Post.find({posterid: req.params.posterid, visibility: "public" }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error, "this is error from backend fetching all public posts");
    res.status(500).json({ message: "Server error" });
  }
});


//this code can update profile pic
router.get("/", async (req, res) => {
  try {
    // Fetch all public posts sorted by creation date in descending order
    const posts = await Post.find({ visibility: "public" }).sort({ createdAt: -1 });

    // Fetch the most recent profile image URL for each posterid
    const postsWithProfilePics = await Promise.all(
      posts.map(async (post) => {
        const recentProfilePic = await Profilepic.findOne({ posterid: post.posterid })
          .sort({ createdAt: -1 })
          .select("profileImageUrl");

        // Assign the most recent profileImageUrl to the post
        return {
          ...post.toObject(),
          profileImageUrl: recentProfilePic ? recentProfilePic.profileImageUrl : null,
        };
      })
    );
res.status(200).json(postsWithProfilePics);
  } catch (error) {
    console.error(error, "this is error from backend fetching all public posts");
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
