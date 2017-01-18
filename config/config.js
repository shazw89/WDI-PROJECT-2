module.exports = {
  port: process.env.PORT || 3000,
  databaseURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/islands-app',
  secret: process.env.SECRET || 'Come hide away here!'
};
