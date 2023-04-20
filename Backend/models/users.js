const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the User Name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact Email address"],
    },
    password: {
      type: String,
      required: [true, "Please add Password"],
    },
    trackerMapping : 
    [
      
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Tracker'
        } 
      
    ]
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);