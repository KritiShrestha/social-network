
const mongoose = require('mongoose');
const Reaction  = require('./Reaction');

// Construct a new instance of the schema class
const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => new Date(createdAt).toISOString(),
  },
  username: {
    type: String,
    required: true,

  },
  reactions: [Reaction.schema]
},
  {
    toJSON: {
      virtuals: true 
    },
    toObject: { virtuals: true },
    id: false,
  });

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
