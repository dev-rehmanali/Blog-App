const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Posts = require("../models/postsmodel");

const { validationResult } = require('express-validator');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const getAllPosts = (req, res, next) => {

  try {
    Posts.find({}).then(user => {
      res.send(user);
    })
  } catch (error) {
    res.send(500, "Could not find server")
  }

};

const addPost = (req, res, next) => {

  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { contentPosted, userId } = req.body;

    Posts.create({
      contentPosted,
      datePosted: Date.now(),
      userId
    },
      function (err, post) {
        console.log(err);
        if (err) return res.status(500).send("There was a problem adding post.");
        res.send(post);
      });

  } catch (error) {
      return next(error);    
  }



};

const getCountCommentsOfPost = (req, res, next) => {

  const postId = req.body.postId;
  try {
    Posts.find({ _id: postId }).populate({
      path: "CommentByPost",
      // match: {_id: postId},
      // select: "contentPosted"
    }).then(user => {
      res.send(user);
    })
  } catch (error) {
    res.send(500, "Could not find server")
  }
};


exports.getAllPosts = getAllPosts;
exports.addPost = addPost;
exports.getCountCommentsOfPost = getCountCommentsOfPost;