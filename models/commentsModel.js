const mongoose = require('mongoose');
const opts = { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } };
const ObjectId = mongoose.Schema.Types.ObjectId;
const commentsSchema = new mongoose.Schema({
      
      content: {
        type: String
      },
      datePosted: {
          type: Date    
      },
      userId: {
          type: ObjectId
      },
      postId: {
          type: ObjectId,
          ref: "Post"
      }

},opts);



const Comment = new mongoose.model("Comment", commentsSchema);

module.exports = Comment;
