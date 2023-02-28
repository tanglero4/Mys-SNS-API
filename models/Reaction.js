const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const reactingSchema = new Schema(
    {
  
      reactingId: [
          {
              type: Schema.Types.ObjectId,
              default: () => new Types.ObjectId(),
          },
      ],

      reactingBody: {
        type: String,
        required: true,
        maxLength: 280,
      },

      username: {
        type: String,
        required: true,
      },

      madeAt: {
        type: Date,
        default: Date.now,
        get madeAt() {
          // unsure of this part
          return Date
        }
    },
},
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
    )


module.exports = Reaction