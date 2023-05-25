
const mongoose = require('mongoose');

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
// reactions:{}
})

module.exports=ThoughtSchema