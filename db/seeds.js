const mongoose    = require('mongoose');
mongoose.Promise  = global.Promise;
const config      = require('../config/config');
const Island      = require('../models/island');

mongoose.connect(config.db);

Island.collection.drop();

const islands = [
  {
    name: 'Devon Island',
    location: 'Baffin Bay, Canada',
    image: 'Devon-Island.jpg',
    lat: '75.5958765',
    lng: '-97.0667821'
  }
];

islands.forEach(island => {
  Island
    .create(island, (err, island) => {
      if (err) return console.log(err);
      return console.log(`${island.name} was saved;`);
    });
});
