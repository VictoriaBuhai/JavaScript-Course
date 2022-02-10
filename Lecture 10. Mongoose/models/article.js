const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 5,
      maxLength: 400,
      required: true,
      index: true
    },
    subtitle: {
      type: String,
      minLength: 5,
      required: false
    },
    description: {
      type: String,
      minLength: 5,
      maxLength: 5000,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: ['sport', 'games', 'history'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Article', ArticleSchema);
