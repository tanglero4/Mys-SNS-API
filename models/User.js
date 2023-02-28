const { Schema, model } = require('mongoose');

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

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
},
{
    toJSON: {
        virtuals: true,
      },
      id: false,
}
);
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

  const User = model('user', userSchema);

  // exports the model
  module.exports = User;