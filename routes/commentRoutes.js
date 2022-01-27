const express = require('express');

const commentController = require('../controllers/comment-controller');

const router = express.Router();

router.get('/getAllComments', commentController.getAllComments);

router.get('/getComment', commentController.getComment);

router.get('/getCommentsByPost', commentController.getCommentsByPost);

router.post('/postComment', commentController.postComment);

// router.get('/getCountComments', commentController.getCountComments);

module.exports = router;
