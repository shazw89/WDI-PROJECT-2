module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost:27017/islands-app',
  secret: process.env.SECRET || 'Come hide away here!'
};
