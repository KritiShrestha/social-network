const mongoose = require('mongoose');

// Construct a new instance of the schema class
const UserSchema = new mongoose.Schema({
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
    },
  
  
);
