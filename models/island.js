const mongoose = require('mongoose');

const islandSchema = new mongoose.Schema({
  name: { type: String },
  location: { type: String },
  image: { type: String },
  area: { type: String },
  description: {type: String },
  lat: { type: String },
  lng: { type: String }
});

module.exports = mongoose.model('Island', islandSchema);
