const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessIdeaSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  yourName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const BusinessIdea = mongoose.model('BusinessIdea', businessIdeaSchema);

module.exports = BusinessIdea;
