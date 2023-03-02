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
      reacting: [
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
  .virtual('reactingCount')

  .get(function () {
    return this.reacting.length;
  });

  const Thought = model('Thought', thoughtSchema)

  // export model
  module.exports = Thought