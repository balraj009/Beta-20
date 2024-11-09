const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
  },
  academicBackground: {
    type: String,
  },
  activityLogs: [{
    loginTime: Date,
    pagesVisited: [String],
    resourcesAccessed: [String]
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
