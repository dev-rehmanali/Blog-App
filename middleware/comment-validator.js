const { check } = require('express-validator')

exports.addCommentValidator = [

    check("content")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Content is required!"),
];



