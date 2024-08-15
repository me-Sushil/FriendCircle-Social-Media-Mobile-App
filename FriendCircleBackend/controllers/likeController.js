// controllers/likeController.js

const Like = require('../like');
const Post = require('../Post');

exports.toggleLikePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      // User already liked the post, so unlike it
      await Like.findByIdAndDelete(existingLike._id);
      
      // Optionally, update the post to decrease the like count
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });

      return res.status(200).json({ message: 'Post unliked successfully.' });
    } else {
      // User has not liked the post yet, so like it
      const newLike = new Like({ postId, userId });
      await newLike.save();
      
      // Optionally, update the post to increase the like count
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

      return res.status(201).json({ message: 'Post liked successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



// exports.getLikesByPostId = async (req, res) => {
//   try {
//     const { postId } = req.params;

//     if (!postId || !postId.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ message: 'Invalid postId format' });
//     }

//     const likes = await Like.find({ postId }).populate('userId', 'name'); // Assuming userinfos have a 'name' field
//     console.log(likes,"thiis is likes of backend");
//     return res.status(200).json(likes);
   
//   } catch (error) {
//     console.error('Error fetching likes:', error); // Log the exact error
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };


