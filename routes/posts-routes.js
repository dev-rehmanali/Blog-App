const express = require('express');

const postController = require('../controllers/posts-controller');

const router = express.Router();

const {addPostValidator} = require('../middleware/post-validator');

const verifyToken = require('../middleware/VerificationMiddleware');

router.get('/getAllPosts', postController.getAllPosts);

router.post('/addPost', [ verifyToken, addPostValidator ], postController.addPost);

router.get('/getCountCommentsOfPost', verifyToken, postController.getCountCommentsOfPost);


module.exports = router;
