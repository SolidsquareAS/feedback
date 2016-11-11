import mongoose from 'mongoose';

const CommentScheme = new mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  changeDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  userId: {
    type: String,
    required: false,
    trim: true
  },
  placeId: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true
  }
});

CommentScheme.set('validateBeforeSave', true);

const Comment = mongoose.model('Comment', CommentScheme);

export default Comment;

