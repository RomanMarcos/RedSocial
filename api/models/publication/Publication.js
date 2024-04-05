const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;