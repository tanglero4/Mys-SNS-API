const { Schema, model } = require('mongoose');
// Thought schema
const userSchema = new Schema(
  {
    username: { 
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Email regex
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
      },
      id: false,
}
);

  // exports users
  module.exports = User;