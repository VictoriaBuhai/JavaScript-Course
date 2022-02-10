const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      required: true
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 60,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'writer', 'guest'],
      default: 'guest'
    },

    numberOfArticles: {
      type: Number,
      default: 0,
      required: false
    },
    nickname: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
