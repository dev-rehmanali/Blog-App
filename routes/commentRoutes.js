const express = require('express');

const commentController = require('../controllers/comment-controller');

const verifyToken = require('../middleware/VerificationMiddleware');

const commentValidator = require('../middleware/comment-validator');

const router = express.Router();

router.get('/getAllComments', commentController.getAllComments);

router.get('/getComment', verifyToken,commentController.getComment);

router.get('/getCommentsByPost', verifyToken, commentController.getCommentsByPost);

router.post('/postComment', [ verifyToken, commentValidator.addCommentValidator ], commentController.postComment);

// router.get('/getCountComments', commentController.getCountComments);

module.exports = router;
