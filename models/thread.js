const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    topic: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    dateCreated: Date,
    category: String,
    posts: [{
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      likes: Number,
      timestamp: Date
    }]
  });
  
  const Thread = mongoose.model('Thread', threadSchema);
  module.exports = Thread;
  
