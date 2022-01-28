const { check } = require('express-validator')

exports.addPostValidator = [

    check("contentPosted")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Content is required!"),
];



