// Require schema and model from mongoose
const Thought = require('./Thought')
const { Schema, model } = require('mongoose');

// Construct a new instance of the schema class
const UserSchema = new Schema({
    // Configure individual properties using Schema Types
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
   
},{
     toJson: {
        virtual: true
    },
    toObject: { virtuals: true },
    id: false,
});

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema)

module.exports = User;
