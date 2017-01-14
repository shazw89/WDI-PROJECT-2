const mongoose    = require('mongoose');
mongoose.Promise  = global.Promise;
const config      = require('../config/config');
const Island      = require('../models/island');

mongoose.connect(config.db);

Island.collection.drop();

const islands = [
  new Island({
    name: 'Devon Island',
    location: 'Baffin Bay, Canada',
    image: 'Devon-Island.jpg',
    area: '55,247 km2',
    description: 'The world\'s largest uninhabited island doesn’t appear quite of this earth. This is why this barren lunarscape serves as the otherworldly stage for scientists training for Mars expeditions. Its most notable feature, the Haughton Impact Crater is considered Earth’s best Mars analog site.',
    lat: '75.241869',
    lng: '-81.795787'
  }),
  new Island({
    name: 'Ball\'s Pyramid',
    location: 'Pacific Ocean',
    image: 'Balls.jpg',
    description: 'Part of Australia’s Lord Howe Island Marine Park, this remote outcropping appears as inhospitable as it is striking. But its sheer cliff faces serve as the last remaining refuge of one of the world’s rarest insect species. The Lord Howe Island Stick Insect was last seen alive in 1920 and was long thought to be extinct. But in 2001, 24 were found living on the island.',
    lat: '-31.753588',
    lng: '159.251218'
  }),
  new Island({
    name: 'Okunoshima',
    location: 'Inland Sea of Japan',
    image: 'Rabbitz.jpg',
    area: '70 ha',
    description: 'This Japanese island is not strictly uninhabited. Its denizens just happen to be adorable feral bunnies who attract tourists by the boatload. But the story of how they got there is nowhere near as warm and cuddly as its present reality. The rabbits are descended from former test subjects at a top-secret chemical weapons lab that produced 6,000 tonnes of poison gas. After WW2, the lab animals were set free to take over an island that had once been their graveyard.',
    lat: '34.311555',
    lng: '132.992103'
  })
];

islands.forEach(island => {
  Island
    .create(island, (err, island) => {
      if (err) return console.log(err);
      return console.log(`${island.name} was saved;`);
    });
});
