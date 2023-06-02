// Require schema and model from mongoose
const Thought = require('./ThoughtSchema')
const { Schema, model } = require('mongoose');


// Construct a new instance of the schema class
const UserSchema = new Schema({
  // Configure individual properties using Schema Types
    Username: { type: String,
         required: true, 
         unique: true, 
         trim: true},

 email: { type: String, 
    required: true, 
    unique: true},
    match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],

thoughts: [{
    type: Schema.Types.objectId,
    ref: 'Thought'
}
],
friends:[{
    type: Schema.Types.objectId,
    ref:'User'
}],
toJson: {
    virtual: true}
},
     
    
  
);
UserSchema.virtual('friendCount').get (function (){
    return this.friends.length;
});

module.exports = User;
