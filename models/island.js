const mongoose = require('mongoose');

const islandSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  location: { type: String, trim: true},
  image: { type: String, trim: true },
  area: { type: String, trim: true },
  description: { type: String, trim: true },
  lat: { type: String, trim: true },
  lng: { type: String, trim: true }
});

module.exports = mongoose.model('Island', islandSchema);
