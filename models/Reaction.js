const { Schema, Types } = require('mongoose');

const reactingSchema = new Schema(
    {
  
      reactingId: 
          {
              type: Schema.Types.ObjectId,
              default: () => new Types.ObjectId(),
          },
          

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
      },
},
  {
      toJSON: {
        getters: true,
      },
      id: false,
    }
);
module.exports = reactingSchema;