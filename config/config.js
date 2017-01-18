module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost/islands-app',
  secret: process.env.SECRET || 'Come hide away here!'
};
