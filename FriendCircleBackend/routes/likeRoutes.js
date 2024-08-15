const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/toggle', likeController.toggleLikePost);
// router.get('/:postId', likeController.getLikesByPostId);

module.exports = router;