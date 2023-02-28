const { Schema, model } = require('mongoose');
const reactingSchema = require('./Reaction')

// Thought Schema
const thoughtSchema = new Schema(
    {
      thoughtText: { 
          type: String,
          required: true,
          maxLength: 289
      },
  
      madeAt: {
          type: Date,
          default: Date.now,
          get madeAt() {
            return Date
          }
      },
  
      username: {
        type: String,
        required: true
      },
      reactions: [
         reactingSchema
      ]
  },
  {
      //Lets virtuals be included
      toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
  }
  );

  thoughtSchema
  .virtual('reactionCount')

  .get(function () {
    return this.reactions.length;
  });

  const Thought = model('thought', thoughtSchema)

  // export model
  module.exports = Thought