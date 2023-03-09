const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Thought Schema with required params
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
      reaction: [
         reactionSchema
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
  const Thought = model('Thought', thoughtSchema)

  thoughtSchema
  .virtual('reactionCount').get(function () {
    return this.reaction.length;
  });

  // export thought
  module.exports = Thought