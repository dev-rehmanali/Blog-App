const { check } = require('express-validator')

exports.addPostValidator = [

    check("title")
        .trim()
        .notEmpty()
        .withMessage("Content is required!"),
    check("bodyContent")
        .trim()
        .notEmpty()
        .withMessage("Body content is required!"),
    check("author")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("author is required!"),
];



