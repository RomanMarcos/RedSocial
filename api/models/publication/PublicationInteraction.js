const mongoose = require('mongoose');

const publicationInteractionSchema = new mongoose.Schema({
  publicationId: {
    type: String,
    required: true
  },
  comment: [{
    type: String
  }],
  like: {
    type: Number
  },
  retweet: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const PublicationInteraction = mongoose.model('PublicationInteraction', publicationInteractionSchema);

module.exports = PublicationInteraction;