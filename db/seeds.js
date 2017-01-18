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
    image: 'devon-island.jpg',
    area: '55,247 km²',
    description: 'The world\'s largest uninhabited island doesn’t appear quite of this earth. This is why this barren lunarscape serves as the otherworldly stage for scientists training for Mars expeditions. Its most notable feature, the Haughton Impact Crater is considered Earth’s best Mars analog site.',
    lat: '75.241869',
    lng: '-81.795787'
  }),
  new Island({
    name: 'Ball\'s Pyramid',
    location: 'Pacific Ocean',
    image: 'balls.jpg',
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
  }),
  new Island({
    name: 'Antipodes Islands',
    location: 'Sub-antarctic islands southeast of the coast of New Zealand',
    image: 'antipodes.jpg',
    area: '22 km²',
    description: 'The abandoned huts in the image serve as a poignant reminder of the long-gone settlers who failed to make a home on these islands. Volcanic and plagued by forbidding weather, the Antipodes have played host to a great many shipwrecks and deaths from starvation,  despite the presence of supplies in castaway huts. ',
    lat: '-49.665599',
    lng: '178.777727'
  }),
  new Island({
    name: 'Jaco Island',
    location: 'East Timor',
    image: 'jaco.jpg',
    description: 'Despite Jaco Island\'s stunning beauty, locals have never called it home. This is because they believe that this is sacred ground that cannot be besmirched with human presence. However, the resident deity appears to tolerate tourists who pick up after themselves and make sure not to wear out their welcome',
    lat: '-8.430461',
    lng: '127.323836'
  }),
  new Island({
    name: 'Clipperton Island',
    location: 'A territory of France off the coast of Mexico',
    image: 'clipperton.jpg',
    area: '8.9 km²',
    description: 'Aside from the obvious reasons (crabs, non-potable water, sharks, barren soil), Clipperton Island has been keeping settlers at bay with a local curse. It was once hotly disputed territory, thanks to its plentiful guano deposits. A colony of 100 inhabitants was established to lay claim to its bounty, only to be promptly forgotten. Its inhospitable climes slowly killed of all the men, leaving only the women, children and a mad lighthouse keeper who named himself King of the Island. For the next few years, he brutalized his charges until two mutinous women hacked him to pieces with an axe. The few remaining settlers were rescued almost immediately after his death and his corpse was left for the scavenging crabs.',
    lat: '10.283358',
    lng: '-109.216656'
  }),
  new Island({
    name: 'Hashima Island',
    location: '15km from Nagasaki, Japan',
    image: 'hashima.jpg',
    area: '6 ha',
    description: 'Japan’s “Battleship Island” may look vaguely familiar to you. This is because it served as inspiration for Raoul Silva’s super villain hideout in Skyfall. Aside from its celebrity status, the island was once the site of a seabed coal mining facility that remained in operation till 1974. Hashima has remained uninhabited since then.',
    lat: '32.628183',
    lng: '129.738649'
  }),
  new Island({
    name: 'Palmyra Atoll',
    location: 'Unoccupied Northern Pacific Atoll',
    image: 'palmyra.jpg',
    area: '12 km²',
    description: 'Perhaps you sense a common theme here. Though not as outwardly hostile as Clipperton Island, this idyllic, biodiverse atoll has literal skeletons in its closet. Voyagers close to its shores have divulged that the atoll inspires indescribable feelings of dread. Palmyra makes good on this air of menace with its history of inexplicable disappearances, shipwrecks and most notably, the double murder of Mac and Muff Graham, two San Diego sailors. ',
    lat: '5.888802',
    lng: '-162.078393'
  }),
  new Island({
    name: 'Cocos Island',
    location: 'Off the shore of Costa Rica',
    image: 'cocos.jpg',
    area: '23.85 km²',
    description: 'Once in a while, islands remain uninhabited for benign reasons. Isla de Coco off the coast of Costa Rica just happens to be protected because it\'s a biologist’s nirvana. It’s extremely biodiverse, boasting 300 species of fish, 400 species of insects and 235 known species of flowering plants. It’s also rumored to be the burial place of hundreds of tonnes of gold hidden by pirates. A treasure trove in more ways than one',
    lat: '5.529191',
    lng: '-87.057178'
  }),
  new Island({
    name: 'Phoenix Islands',
    location: 'Pacific Ocean, a territory of Kiribati',
    image: 'phoenix.jpeg',
    description: 'These form is a protected area, thanks to its remoteness and relatively undisturbed marine ecosystems. Once a hub for whalers and guano miners, They’re now better known as home to 120 species of coral and more than 500 species of fish. However, the island of Nikumaroro gained notoriety as a place Amelia Earhart might have crash landed at on her ill-fated 1937 flight.',
    lat: '-4.449639',
    lng: '-171.239217'
  }),
  new Island({
    name: 'Mamanuca',
    location: 'Fiji',
    image: 'mamanuca.jpg',
    description: 'Though they\'re one of the most established resort areas in one of the world’s favourite tourist spots, not all of the Mamanuca Islands are inhabited. We’re willing to wager that a large reason for this is that seven of them are submerged by water at high -tide. None of this deterred Tom Hanks, who traveled to Monuriki to the desert island classic, Cast Away. ',
    lat: '-17.609624',
    lng: '177.033580'
  }),
  new Island({
    name: 'Tetepare',
    location: 'Western Province of the Solomon Islands',
    image: 'tetepare.jpg',
    area: '118 km²',
    description: 'The island was so named after its former inhabitants, the Tetepare people. They were a distinct ethnic group with their own customs and unique language, but for reasons that remain unknown, they evacuated the island in the mid-19th century. Now, the island is populated by wild pigs, who incidentally are also called Tetepare.',
    lat: '-8.740852',
    lng: '157.558953'
  }),
  new Island({
    name: 'Maldives',
    location: 'Indian Ocean',
    image: 'maldives.jpg',
    description: 'No, this is not a mistake. Doubtless, you’ve heard of the Maldives at some point in your life and you’re vaguely aware that it has a capital. Which it does. But get this, 1,000 of its 1,200 coral islands remain untouched. In fact, the country makes a business of arranging expeditions to these unexplored idylls so tourists can play king of the island for a day. Though, of course, not THAT kind of king of the island (see Clipperton Island).',
    lat: '1.977908',
    lng: '73.536774'
  }),
  new Island({
    name: 'Aldabra',
    location: 'Seychelles Archipelago',
    image: 'aldabra.jpg',
    area: '155.4 km²',
    description: 'The world’s second-largest coral atoll, this ecological funhouse is a haven for hyperbole. It boasts the world’s largest population of giant tortoises, with 100,000 specimens outnumbering Seychelles’ entire human population of 93,000. It’s also only one of two oceanic breeding sites of greater flamingos in the world. It’s no wonder the scientific community was up in arms when the RAF and BBC tried to build a base and a radio relay station there in the 60’s.',
    lat: '-9.419846',
    lng: '46.341881'
  }),
  new Island({
    name: 'Eil Malk',
    location: 'Mercherchar Islands, Palau',
    image: 'jellyfish.jpg',
    area: '19 km²',
    description: 'This Y-shaped island saw its only human inhabitants from 1200 - 1450. Its current overlords are rather more… spineless. The island has gained worldwide fame for its stunning Jellyfish Lake, where visitors can float in timeless bliss with millions of stingless jellyfish. But don’t leave caution to the winds and venture more than 49 m below the lake’s surface. The hydrogen sulfide level here is lethally high and will poison you through your skin.',
    lat: '7.152023',
    lng: '134.356666'
  }),
  new Island({
    name: 'Makronisos',
    location: 'Aegean Sea',
    image: 'top.jpg',
    area: '20 km²',
    description: 'This barren islet with a smattering of abandoned buildings has quite a checkered past. Reputed to have been a refuge for Helen of Troy during the Trojan War, it was put to much more sinister purpose during the mid-20th century. Members of the Greek Uprising against the Nazis were imprisoned and tortured in work camps on the island during WW2. Even after the war ended, the bloodshed did not cease. In fact, the island saw even more human rights abuses during the following Greek civil war. Communists were sent to be remodeled into “good” citizens”. Many did not survive their time on Makronisos.',
    lat: '37.730487',
    lng: '24.137554'
  }),
  new Island({
    name: 'Mosken Island',
    location: 'Lofoten Islands, Norway',
    image: 'maelstrom.jpg',
    area: '50 ha',
    description: 'You’d hardly expect turbulence from this isle cloaked in mist and solitude. But believe it or not, it’s where the word maelstrom originated, thanks to the tempestuous whirlpool on its northern side. The Moskstraumen is a system of tidal vortices that are among the world’s most powerful. The Moskstraumen inspired so much awe and dread in spectators that Edgar Allan Poe made it the setting for his short story “A Descent Into The Maelstrom”.',
    lat: '67.747914',
    lng: '12.756342'
  }),
  new Island({
    name: 'Ellidaey',
    location: 'Vestmannaeyjar, Iceland',
    image: 'ellidaey.jpg',
    area: '110 acres',
    description: 'This iconic island with its trademark white house has been the subject of much urban legend. Some have posited that it belongs to Bjork, who retreats to the lone cabin when she needs to get away from it all. Others speculated that another shy billionaire reserved the island for his exclusive use. The real story is that the island and cabin belong to a local hunting association that fiercely prohibits its use to non-members.',
    lat: '63.464437',
    lng: '-20.175555'
  }),
  new Island({
    name: 'Bouvet Island',
    location: 'South Atlantic Ocean',
    image: 'bouvetboat.jpg',
    area: '49 km²',
    description: 'Here’s the world’s most remote landmass, situated 1,404 miles from the nearest humans on Tristan da Cunha. Unlike many other desert islands, Bouvet is no untouched Eden. About 93% glacier, the island permits only lichen and moss to grow on its arid surface. This is why an abandoned boat found upon the island proved to be such an enigma. It appears we’ll never know the real truth, as the island is jealously guarded by Norwegian authorities who’ve given it its own internet domain name .bv.',
    lat: '-54.420195',
    lng: '3.346533'
  }),
  new Island({
    name: 'Ilha de Queimada Grande',
    location: 'Itanhaem, Brazil',
    image: 'ilhadeq.jpg',
    area: '43 ha',
    description: 'The island is also known as Ilha das Cobras, which should clue you in on why it remains unpopulated. It’s the only known habitat of the critically endangered golden lancehead, a kind of pit viper that got stranded on the island after water levels rose and separated it from the mainland. Should you land on the island, you’ve just about signed your own death warrant. There is at least one snake every square meter and its venom is known to disintegrate human flesh into a soupy mess.',
    lat: '-24.487793',
    lng: '-46.674091'
  }),
  new Island({
    name: 'Howland Island',
    location: 'Phoenix Islands, central Pacific Ocean',
    image: 'howland.jpg',
    area: ' 4.5 km²',
    description: 'Like many others in the South Pacific, this coral island was once of interest to the US because of its guano harvests. However, it became much more famous for its unpaved landing strip, which was meant to be one of Amelia Earheart’s scheduled refueling stops during her flight around the world. However, she never arrived and the entire island was eventually evacuated because of vicious attacks by Japanese aircraft during WW2.',
    lat: '0.811341',
    lng: '-176.618366'
  }),
  new Island({
    name: 'Poveglia',
    location: 'Province of Venice',
    image: 'poveglia.jpg',
    description: 'If you’ve been nursing an idea for a survival horror game for a while, there’s no better place for inspiration than Poveglia. However, virtually anyone else should give it a wide berth. The soil in this island of crumbling, abandoned buildings is said to be composed of 50 percent human remains. Originally a quarantine area that bore witness the deaths of 160,000 plague victims, Poveglia became a mental asylum in 1922. The head doctor was rumoured to be a sadistic beast of a man who performed forced lobotomies on his patients. He eventually jumped to his death from the bell tower to escape vengeful spirits. None can say if these were the ghosts of plague sufferers or his own hapless victims.',
    lat: '45.381906',
    lng: '12.331167'
  }),
  new Island({
    name: 'Isla de las Muñecas',
    location: 'Xochimilco, south of Mexico City',
    image: 'dollz.jpg',
    description: 'If you’re afraid of dolls or the cyclical nature of history, Isla de las Muñecas isn’t the place for you. For reasons that remain unknown, an eccentric man named Don Julian Santana left his wife and child to settle on this island on Teshuilo Lake. According to his accounts, he found a drowned girl and dedicated the rest of his life to communing with her. How, you say? He obsessively collected dolls and covered every square inch of his new home with the toys, leaving them in whatever imperfect state he found them in. The ghost girl eventually answered his call. His drowned body was found in the exact same spot he claimed to have found her corpse.',
    lat: '19.290168',
    lng: '-99.096485'
  }),
  new Island({
    name: 'Daksa',
    location: 'Elaphiti Islands, Croatia',
    image: 'daksa.jpg',
    area: '0.07 km²',
    description: 'There’s a reason no one will touch what would otherwise be prime real estate in the Adriatic Sea. Stunning Daksa so happens to be the final resting place of 53 alleged Nazi sympathisers. Before you indulge in too much schadenfreude, keep in mind that many of these people were condemned without a trial. In 1944, outing suspected Nazis became something of a national sport in Croatia. In their zeal, the hunters hardly seemed to think evidence against their victims was important.',
    lat: '42.667904',
    lng: '18.057266'
  }),
  new Island({
    name: 'Ernst Thalmann Island',
    location: 'Gulf of Cazones, Cuba',
    image: 'thalmann.jpg',
    description: 'Thought East Germany fell with the Berlin Wall? It shares a lone Cuban island with a large number of endangered species. After a state visit by Erich Honecker in 1972, Fidel Castro renamed it in honour of Ernst Thalmann, the leader of the Communist Party of Germany who was imprisoned and shot in Buchenwald after the rise of the Nazi army. The handover ceremony was broadcast on East German TV. These days, the only nation to dispute East Germany’s claim to the island is the Republic of Molossia, a country composed of a single household in Nevada.',
    lat: '22.033353',
    lng: '-81.400000'
  }),
  new Island({
    name: 'Champ Island',
    location: 'Franz Joseph Land, Russia, Arctic Sea',
    image: 'champ.jpg',
    area: '374 km²',
    description: 'Unlike many of the islands on our map, Champ Island contains no traces of human settlement on its shores. This is why the profusion of perfectly spherical stones of different sizes remains completely baffling. Despite their polished appearance, these stones may actually be examples of a natural phenomenon called concretions. These result when a cement made from water and sediment collection around organic material like leaves, twigs and shells. In other words, the island may just be a giant oyster and these its pearls.',
    lat: '80.673907',
    lng: '56.236900'
  }),
  new Island({
    name: 'St Kilda',
    location: 'Outer Hebrides',
    image: 'st-kilda.jpg',
    area: '8.546 km²',
    description: 'Why should you care about St Kilda? Where do we even start? It’s extraordinarily rich in natural wonders for one, with staggering vistas and an immense array of marine birdlife. But its historical treasures hardly pale in significance to its splendour. Occupied for at least two millennia, the island contains a wealth of relics from bygone eras, from Neolithic structures to almost intact abandoned villages from the last century. The island was evacuated during the First World War, after crop failures and an influenza outbreak among the previously isolated inhabitants.',
    lat: '57.814096',
    lng: '-8.586024'
  }),
  new Island({
    name: 'Senkaku Islands',
    location: 'East China Sea',
    image: 'senkaku.jpg',
    area: '7 km²',
    description: 'The main reason Japan, China and Taiwan will never get along. If you were from Japan, you’d call them the Senkaku Islands. But if you were from China, you’d insist on calling them the Diaoyu Islands and Diaoyutai if you were Taiwanese. No matter what name you’d use, this is heavily disputed territory. Historically, it’s changed hands a few times. The Chinese laid claim to its discovery and ownership from the fourteenth century while Japan took over from 1895 till WW2. The US returned it to Japanese rule in 1972, an extremely controversial decision that continues to affect diplomatic relations between the three Asian nations to this day.',
    lat: '25.746319',
    lng: '123.474200'
  })
];

islands.forEach(island => {
  Island
    .create(island, (err, island) => {
      if (err) return console.log(err);
      return console.log(`${island.name} was saved;`);
    });
});
