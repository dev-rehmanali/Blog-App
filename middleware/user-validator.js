const { check } = require('express-validator')

exports.signUpValidator = [

    check("name")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Name is required!"),
    check("email")
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("Please provide a valid email address!")
        .normalizeEmail()
        .notEmpty()
        .withMessage("Email is required!"),
    check("password")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Password is required!"),
];


exports.loginValidator = [

    check("email")
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("Please provide a valid email address!")
        .normalizeEmail()
        .notEmpty()
        .withMessage("Email is required!"),
    check("password")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Password is required!"),
];

exports.resetValidator = [

    check("email")
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("Please provide a valid email address!")
        .normalizeEmail()
        .notEmpty()
        .withMessage("Email is required!")
];

