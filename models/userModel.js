const mongoose = require('mongoose');
const opts = { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } };
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        data: Buffer,
        contentType: String
    }

}, opts);

userSchema.virtual('PostsByUser', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'userId',
    count: false,

});

const Users = new mongoose.model("PostingUser", userSchema);

module.exports = Users;