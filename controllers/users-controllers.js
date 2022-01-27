const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const Employee = require("../models/userModel");
const verifyToken = require('../middleware/VerificationMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const getUsers = (req, res, next) => {
  try {
    Employee.find({}).then(user => {
      res.send(user);
    })
  } catch (error) {
    console.log("Cannot get Users");
  }

};

const currentUser = (req, res, next) => {

    Employee.findById(req.userId,
      { _id: 1 },
      function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
      });
};

const getPostsByUser = (req, res, next) => {

  const userId = req.userId;

  console.log(userId);
  try {
    Employee.find({_id: userId}).populate({
      path: "PostsByUser"
    }).then(user => {
      console.log(user);
      res.send(user);
    })
  } catch (error) {
    console.log("Cannot get posts");
  }

};

const signup = (req, res, next) => {

  const { name, email, password } = req.body;

  var hashedPassword = bcrypt.hashSync(password, 8);
  const hasUser = Employee.findOne({ email: email }).then(users => {

    if (users) {
      res.status(422).send('Could not create user, email already exists.');
    } else {
      Employee.create({
        name: name,
        email: email,
        password: hashedPassword
      },
        function (err, user) {
          if (err) return res.status(500).send("There was a problem registering the user.")
          // creating a token
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
        });
    }

  });

};

const login = (req, res, next) => {

  Employee.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: "Wrong Password", auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

};

const logout = (req, res, next) => {
  res.status(200).send({ auth: false, token: null });
}

const reset = (req, res, next) => {

  Employee.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user with this email exists.');

    res.status(200).send({ message: "Password Reset email Sent", auth: true, token: token });
  });

};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage }).single('userPhoto');

const picupload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.send("Error uploading file.");
    }
    res.send("File uploaded " + req.file.filename);

  });
};

const getFile = (req, res) => {
  try {
    const file = gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
};

const deleteFile = (req, res) => {
  try {
    gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.reset = reset;
exports.currentUser = currentUser;
exports.logout = logout;
exports.getFile = getFile;
exports.deleteFile = deleteFile;
exports.picupload = picupload;
exports.getPostsByUser = getPostsByUser;