const express = require('express');

const commentController = require('../controllers/comment-controller');

const verifyToken = require('../middleware/VerificationMiddleware');

const router = express.Router();

router.get('/getAllComments', commentController.getAllComments);

router.get('/getComment', verifyToken,commentController.getComment);

router.get('/getCommentsByPost', verifyToken, commentController.getCommentsByPost);

router.post('/postComment', verifyToken, commentController.postComment);

// router.get('/getCountComments', commentController.getCountComments);

module.exports = router;
