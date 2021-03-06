const mongoose = require('mongoose');
const opts = { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } };
const ObjectId = mongoose.Schema.Types.ObjectId;
const postsSchema = new mongoose.Schema({

    title: {
        type: String
    },
    bodyContent: {
        type: String
    },
    datePosted: {
        type: Date
    },
    author: {
        type: String
    },
    userId: {
        type: ObjectId,
        ref: "PostingUser"
    }

},opts);

postsSchema.virtual('CommentByPost', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'postId',
    count: true,

});
  



const Post = new mongoose.model("Post", postsSchema);

module.exports = Post;