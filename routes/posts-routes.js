const express = require('express');

const postController = require('../controllers/posts-controller');

const router = express.Router();

const verifyToken = require('../middleware/VerificationMiddleware');

router.get('/getAllPosts', postController.getAllPosts);

router.post('/addPost', postController.addPost);

router.get('/getCountCommentsOfPost', postController.getCountCommentsOfPost);


// router.post('/reset', usersController.reset);

// router.get('/currentuser',verifyToken , usersController.currentUser);

// router.post("/image", usersController.picupload);

// router.get("/file/:filename", usersController.getFile);

// router.delete("/file/:filename", usersController.deleteFile);

module.exports = router;
