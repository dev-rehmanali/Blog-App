const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Comments = require("../models/commentsModel");

const { validationResult } = require('express-validator');

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
  
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const {content, userId, postId} = req.body;

      Comments.create({
        content,
        datePosted: Date.now(), 
        userId,
        postId
      },
      function (err, comment) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        res.status(200).send(comment);
      });
    
  } catch (error) {
      return next(error);    
  } 

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
