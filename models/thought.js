
const mongoose = require('mongoose');
const ReactionSchema = require('./reaction');
const {getformattedTimestamp} = require('../utils/timestamp')

// Construct a new instance of the schema class
const ThoughtSchema = new mongoose.Schema({
    thoughtText: { type: String,
        required: true, 
        minlength: 1,
        maxlength:280,
        createdAt: {
            type: Date,
            default: Date.now,
          },
        },
          toJSON: {
            getters: true,
          },
    username:{
        type: String,
        required: true,

    },
    reactions:[ReactionSchema]
});
ThoughtSchema.virtual('reactionCount').get (function (){
    return this.reactions.length;
});
const Thought = ('Thought', ThoughtSchema);

module.exports = Thought;
