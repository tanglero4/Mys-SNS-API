const { connect, connection } = require('mongoose');

const connectingString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/snsDB';

connect(connectingString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;