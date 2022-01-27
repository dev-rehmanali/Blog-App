const express = require('express');

const usersController = require('../controllers/users-controllers');

const upload = require("../middleware/upload");

const router = express.Router();

const verifyToken = require('../middleware/VerificationMiddleware');

router.get('/', usersController.getUsers);

router.get('/getPostsByUser', verifyToken, usersController.getPostsByUser);

router.post('/signup', verifyToken, usersController.signup);

router.post('/login', verifyToken,  usersController.login);

router.get('/logout', usersController.logout);

router.post('/reset', usersController.reset);

router.get('/currentuser',verifyToken , usersController.currentUser);

router.post("/image", usersController.picupload);

router.get("/file/:filename", usersController.getFile);

router.delete("/file/:filename", usersController.deleteFile);

module.exports = router;
