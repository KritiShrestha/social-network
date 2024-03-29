const {getFormattedTimestamp} = require('../utils/timestamp')
const mongoose = require('mongoose');

const reactionSchema  = new mongoose.Schema({
    reactionId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: getFormattedTimestamp
    }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;