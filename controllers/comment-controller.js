const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Comments = require("../models/commentsModel");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());


const getAllComments = (req, res, next) => {

    try {
      Comments.find({}).then(comment =>{
       res.send(comment);
      })
    } catch (error) {
        res.send(500, "Could not find server")
    }
  
};

const postComment = (req, res, next) => {
  
    const {content, commentedBy, userId, postId} = req.body;

      Comments.create({
        content,
        commentedBy,
        datePosted: Date.now(), 
        userId,
        postId
      },
      function (err, comment) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        // creating a token
        var token = jwt.sign({ id: comment._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      }); 

};

const getComment = (req, res, next) => {

    const userId = req.body.userId;
    try {
        Comments.find({userId: userId}).then(comment =>{
         res.send(comment);
        })
      } catch (error) {
          res.send(500, "Could not find server")
      }

};

const getCommentsByPost = (req, res, next) => {

    const postId = req.body.postId;
    try {
      Comments.find({postId: postId}).then(comment =>{
        res.status(200).send(comment);
        })
      } catch (error) {
          res.send(500, "Could not find server")
      }

};

exports.getAllComments = getAllComments;
exports.getComment = getComment;
exports.postComment = postComment;
exports.getCommentsByPost = getCommentsByPost;
