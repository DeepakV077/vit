// This file contains all the mock data for the application,
// including the marine species encyclopedia and chatbot responses.

/**
 * Interface for a single marine species.
 * Includes detailed information for the encyclopedia.
 */
interface MarineSpecies {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  conservationStatus:
    | 'Least Concern'
    | 'Near Threatened'
    | 'Vulnerable'
    | 'Endangered'
    | 'Critically Endangered'
    | 'Data Deficient';
  habitat: string;
  diet: string;
  ecology: string;
  behavior: string;
  interestingFact: string;
  funFacts: string[];
  optimalConditions: {
    temperature: { min: number; max: number };
    salinity: { min: number; max: number };
    depth: { min: number; max: number };
  };
  threats: string[];
}

import React from 'react';

/**
 * An extensive list of marine species for the encyclopedia.
 * Now includes real image URLs and expanded details.
 */
export const marineSpeciesData: MarineSpecies[] = [
  {
    id: '1',
    name: 'Coral Reefs',
    scientificName: 'Anthozoa',
    description:
      'Often called "rainforests of the sea," coral reefs are large underwater structures composed of the skeletons of colonial marine invertebrates called coral polyps. They are among the most diverse ecosystems on Earth, supporting a vast array of marine life.',
    image:
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
    conservationStatus: 'Endangered',
    habitat:
      'Shallow, warm, clear, sunny, and agitated tropical waters. Found in a band 30°N and 30°S of the equator, in regions like the Great Barrier Reef (Australia), the Red Sea, and the Caribbean.',
    diet: 'Corals are primarily filter-feeders, catching zooplankton and small fish with their stinging tentacles. However, they get up to 90% of their nutrients from a symbiotic algae called zooxanthellae, which photosynthesizes within their tissues.',
    ecology:
      'Coral reefs are a keystone ecosystem. They provide food and shelter for over 4,000 species of fish (25% of all marine fish), as well as crustaceans, mollusks, and sea turtles. They also protect coastlines from storm surge and erosion.',
    behavior:
      'As colonial organisms, corals are sessile (fixed in one place). The polyps are typically nocturnal, extending their tentacles to feed at night and retracting during the day to allow their zooxanthellae to access sunlight.',
    interestingFact:
      'Although they look like plants, corals are actually animals—closely related to jellyfish and sea anemones.',
    funFacts: [
      'The Great Barrier Reef is the largest living structure on Earth, visible from space.',
      'Coral skeletons are naturally white; their vibrant colors come from the symbiotic zooxanthellae algae.',
      'Some deep-sea corals exist in cold, dark waters and do not rely on sunlight.',
    ],
    optimalConditions: {
      temperature: { min: 23, max: 29 },
      salinity: { min: 32, max: 40 },
      depth: { min: 1, max: 30 },
    },
    threats: [
      'Climate change',
      'Ocean acidification',
      'Coral bleaching',
      'Pollution',
      'Overfishing',
      'Coastal development',
      'Disease',
    ],
  },
  {
    id: '2',
    name: 'Bluefin Tuna',
    scientificName: 'Thunnus thynnus',
    description:
      'The Bluefin Tuna is a magnificent, powerful predator built for speed and endurance. It is one of the fastest fish in the sea, capable of retracting its fins to reduce drag. Its meat is highly prized, which has led to severe overfishing.',
    image:
      'https://images.unsplash.com/photo-1697030891256-36a3770cddde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1665',
    conservationStatus: 'Endangered',
    habitat:
      'Pelagic (open ocean). Found in the subtropical and temperate waters of the North Atlantic Ocean, the Mediterranean Sea, and the Black Sea. They are highly migratory, crossing the entire Atlantic.',
    diet: 'A voracious, carnivorous predator. Feeds on smaller fish such as mackerel, herring, sardines, and anchovies, as well as squid and crustaceans.',
    ecology:
      'As an apex predator, the Bluefin Tuna plays a crucial role in regulating the populations of smaller fish, maintaining the balance of the marine food web.',
    behavior:
      'Bluefin Tuna are warm-blooded (endothermic), a rare trait for fish, which allows them to maintain a high body temperature. This enables them to hunt in cold, deep waters and perform long, fast migrations.',
    interestingFact:
      'A single Bluefin Tuna can be worth a fortune; one fish sold for a record $3.1 million in Japan in 2019.',
    funFacts: [
      'They can swim at speeds up to 43 miles per hour (70 km/h).',
      'They are one of the few fish that are warm-blooded, similar to mammals and birds.',
      'Bluefin Tuna can grow to be 10 feet long and weigh over 1,500 pounds.',
    ],
    optimalConditions: {
      temperature: { min: 10, max: 25 },
      salinity: { min: 33, max: 37 },
      depth: { min: 0, max: 1000 },
    },
    threats: [
      'Overfishing',
      'Bycatch',
      'Aquaculture',
      'Climate change',
      'Pollution',
    ],
  },
  {
    id: '3',
    name: 'Mangrove Forests',
    scientificName: 'Rhizophoraceae',
    description:
      'Mangrove forests are unique coastal ecosystems of salt-tolerant (halophytic) trees and shrubs that grow in the intertidal zone. Their dense, tangled root systems act as a natural barrier and a vital nursery.',
    image:
      'https://images.unsplash.com/photo-1667885565182-072c68ad3c97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074',
    conservationStatus: 'Vulnerable',
    habitat:
      'Tropical and subtropical coastlines, estuaries, and riverbanks where freshwater mixes with saltwater. Found in regions like Southeast Asia, Florida, and Brazil.',
    diet: 'Not applicable (Plant). As primary producers, they form the base of a complex food web, converting sunlight into energy through photosynthesis.',
    ecology:
      'Mangroves are critical "ecosystem engineers." Their roots trap sediment, stabilize coastlines, and protect against erosion and tsunamis. They also act as a nursery, providing a safe, nutrient-rich habitat for juvenile fish, crabs, and shrimp.',
    behavior:
      'To survive in salty, oxygen-poor soil, mangroves have evolved unique adaptations. Some have "prop roots" that anchor them in the mud, while others send up "pneumatophores" (breathing roots) to get oxygen from the air.',
    interestingFact:
      'Mangroves are one of the most effective ecosystems at carbon sequestration, storing up to four times more carbon per acre than rainforests.',
    funFacts: [
      'Some mangrove trees excrete salt from their leaves, which can sometimes be seen as white crystals.',
      'The "walking mangrove" (Red Mangrove) appears to be walking on water due to its stilt-like prop roots.',
      'They are a vital transition zone between land and sea.',
    ],
    optimalConditions: {
      temperature: { min: 20, max: 35 },
      salinity: { min: 5, max: 30 },
      depth: { min: 0, max: 2 },
    },
    threats: [
      'Coastal development',
      'Aquaculture (shrimp farms)',
      'Sea level rise',
      'Pollution',
      'Deforestation',
      'Dam construction (altering freshwater flow)',
    ],
  },
  {
    id: '4',
    name: 'Clownfish',
    scientificName: 'Amphiprioninae',
    description:
      'Instantly recognizable by their bright orange and white stripes, clownfish are small, hardy fish. They are famous for their fascinating symbiotic relationship with sea anemones, whose stinging tentacles provide them with a safe home.',
    image:
      'https://images.unsplash.com/photo-1595503240812-7286dafaddc1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvd25maXNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Warm, shallow waters of the Indian and Pacific Oceans, including the Red Sea and the Great Barrier Reef. They live exclusively within the tentacles of host sea anemones in sheltered reefs or lagoons.',
    diet: "Omnivorous. Feeds on small zooplankton, copepods, and algae from the water column, as well as scraps of food left over from the anemone's meals.",
    ecology:
      "The clownfish and anemone have a mutualistic relationship. The fish is protected from predators by the anemone's sting (to which it is immune), and in return, the clownfish cleans the anemone, provides it with nutrients via its waste, and scares off polyp-eating fish.",
    behavior:
      'Clownfish have a strict social hierarchy. The largest fish is the dominant female, and the second-largest is the breeding male. If the female dies, the breeding male will change sex to become the new female, and the next-largest male will become the new breeding male.',
    interestingFact:
      'All clownfish are born male. They only change sex to become a dominant female if the opportunity arises.',
    funFacts: [
      'The movie "Finding Nemo" made this species famous worldwide.',
      'A clownfish develops its immunity to the anemone by performing a "dance" and slowly touching its tentacles, acclimating to the sting.',
      'There are over 30 recognized species of clownfish.',
    ],
    optimalConditions: {
      temperature: { min: 24, max: 28 },
      salinity: { min: 34, max: 36 },
      depth: { min: 1, max: 15 },
    },
    threats: [
      'Climate change',
      'Ocean acidification',
      'Pet trade collection',
      'Coral bleaching (which kills their host anemones)',
    ],
  },
  {
    id: '5',
    name: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    description:
      'The Blue Whale is the largest animal to have ever lived on Earth, even larger than the biggest dinosaurs. It is a baleen whale, meaning it has bristle-like plates in its mouth to filter-feed on tiny prey.',
    image:
      'https://plus.unsplash.com/premium_photo-1661847613093-bbb6d1c0f73a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJsdWUlMjB3aGFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Endangered',
    habitat:
      'All oceans worldwide, though their populations are fragmented. They undertake long migrations from cold, polar feeding grounds (like Antarctica) to warm, tropical breeding grounds.',
    diet: 'Almost exclusively krill, a tiny shrimp-like crustacean. A single Blue Whale can consume up to 4 tons (8,000 pounds) of krill in a single day during its feeding season.',
    ecology:
      'As massive filter-feeders, Blue Whales are vital to nutrient cycling. They feed at depth and release "fecal plumes" at the surface, which are rich in iron and nitrogen, acting as fertilizer for phytoplankton—the base of the entire marine food web.',
    behavior:
      'Blue Whales are the loudest animals on Earth. Their low-frequency pulses and moans can travel for hundreds of miles underwater and are likely used to communicate with other whales over vast distances.',
    interestingFact:
      "A Blue Whale's heart is the size of a small car, and its tongue alone can weigh as much as an elephant.",
    funFacts: [
      'A newborn Blue Whale calf is 23 feet long and gains 200 pounds every day.',
      'Its call is louder than a jet engine (at 188 decibels).',
      'It can lunge-feed, engulfing a volume of water larger than its own body.',
    ],
    optimalConditions: {
      temperature: { min: 3, max: 20 },
      salinity: { min: 33, max: 37 },
      depth: { min: 1, max: 500 },
    },
    threats: [
      'Vessel strikes',
      'Entanglement in fishing gear',
      'Climate change',
      'Ocean noise pollution',
      'Historical whaling (cause of initial decline)',
    ],
  },
  {
    id: '6',
    name: 'Great White Shark',
    scientificName: 'Carcharodon carcharias',
    description:
      "The Great White Shark is the world's largest known predatory fish and a true apex predator. It is a highly evolved and intelligent hunter, famous for its \"breaching\" behavior where it launches itself out of the water to catch prey.",
    image:
      'https://plus.unsplash.com/premium_photo-1664297946624-31525b13ce99?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R3JlYXQlMjBXaGl0ZSUyMFNoYXJrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Coastal and offshore waters with temperatures between 12 and 24°C, especially in regions with large seal or sea lion colonies, such as South Africa, Australia, and California.',
    diet: 'Carnivorous. Juveniles eat fish and rays. Adults specialize in hunting pinnipeds (seals, sea lions), but also scavenge on dolphins and whale carcasses.',
    ecology:
      'As an apex predator, the Great White Shark helps maintain the health of the ocean by preying on weak, sick, and old animals, and by keeping seal populations in check, which in turn protects fish stocks.',
    behavior:
      'Great Whites are surprisingly complex. They can be curious and exhibit social behaviors. They are not the "mindless eating machines" portrayed in movies. They use "spy-hopping" (peeking their head out of the water) to observe their surroundings.',
    interestingFact:
      'Great White Sharks have a "sixth sense" — organs called Ampullae of Lorenzini that allow them to detect the faint electrical fields of other living animals.',
    funFacts: [
      'They can have up to 300 serrated, triangular teeth in several rows.',
      'When a tooth is lost, another one moves forward to replace it.',
      'They can detect a single drop of blood in 25 gallons (100 liters) of water.',
    ],
    optimalConditions: {
      temperature: { min: 12, max: 24 },
      salinity: { min: 34, max: 36 },
      depth: { min: 1, max: 1200 },
    },
    threats: [
      'Overfishing',
      'Bycatch',
      'Pollution',
      'Negative public perception',
      'Habitat degradation',
      'Shark finning',
    ],
  },
  {
    id: '7',
    name: 'Emperor Penguin',
    scientificName: 'Aptenodytes forsteri',
    description:
      'The tallest and heaviest of all penguin species, the Emperor Penguin is a marvel of adaptation. It is endemic to Antarctica and is the only penguin that breeds during the harsh Antarctic winter.',
    image:
      'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RW1wZXJvciUyMFBlbmd1aW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Near Threatened',
    habitat:
      'Antarctic sea ice and surrounding cold waters. They require stable "fast ice" (ice attached to the continent) to form breeding colonies and raise their chicks.',
    diet: 'Primarily fish, as well as krill and squid. They are exceptional divers, capable of reaching depths of 500 meters (1,800 feet) and holding their breath for over 20 minutes.',
    ecology:
      'Emperor Penguins are a key part of the Antarctic food web, both as a predator of fish and squid and as prey for leopard seals and orcas.',
    behavior:
      'They exhibit extreme social cooperation. To survive temperatures of -60°C and high winds, males huddle together in dense groups of thousands, constantly rotating so each gets a turn in the warm center.',
    interestingFact:
      'The male Emperor Penguin incubates a single egg on his feet for two months in the dead of winter, without eating, while the female is at sea feeding.',
    funFacts: [
      'They are the deepest-diving birds in the world.',
      'Their dense, overlapping feathers provide waterproof insulation.',
      'They can "toboggan" on their bellies across the ice to save energy.',
    ],
    optimalConditions: {
      temperature: { min: -10, max: 5 },
      salinity: { min: 33, max: 35 },
      depth: { min: 1, max: 500 },
    },
    threats: [
      'Climate change',
      'Sea ice loss',
      'Krill fishery competition',
      'Habitat degradation',
      'Disease',
    ],
  },
  {
    id: '8',
    name: 'Sea Otter',
    scientificName: 'Enhydra lutris',
    description:
      'Sea Otters are marine mammals known for their playful behavior and dense fur—the thickest in the animal kingdom. They are a keystone species, vital for the health of kelp forests.',
    image:
      'https://images.unsplash.com/photo-1698435354379-b10bcc803369?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2VhJTIwT3R0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Endangered',
    habitat:
      'Shallow coastal waters of the northern and eastern North Pacific Ocean, particularly in kelp forests. They rarely go more than a kilometer from shore.',
    diet: 'Sea urchins, crabs, clams, mussels, and other marine invertebrates. They are one of the few mammals known to use tools, using rocks to break open hard shells.',
    ecology:
      'Sea Otters are a classic keystone species. They prey on sea urchins, which in turn graze on kelp. Without otters, urchin populations explode and destroy kelp forests, creating "urchin barrens" and devastating biodiversity.',
    behavior:
      'Sea Otters are highly social. They often float on their backs in groups called "rafts," sometimes holding hands (or paws) while sleeping so they don\'t drift apart. They are meticulous groomers, as their fur must be perfectly clean to remain waterproof.',
    interestingFact:
      'Sea Otters have the densest fur of any animal, with up to one million hairs per square inch, which they rely on for insulation as they have no blubber.',
    funFacts: [
      'They eat 25% of their body weight in food every single day.',
      'They have a "pocket" of loose skin under their forearms to store food and their favorite rock.',
      'They are the smallest marine mammal in North America.',
    ],
    optimalConditions: {
      temperature: { min: 2, max: 15 },
      salinity: { min: 30, max: 36 },
      depth: { min: 0, max: 40 },
    },
    threats: [
      'Oil spills',
      'Pollution',
      'Entanglement in fishing gear',
      'Vessel strikes',
      'Disease',
      'Shark attacks',
    ],
  },
  {
    id: '9',
    name: 'Giant Pacific Octopus',
    scientificName: 'Enteroctopus dofleini',
    description:
      'The Giant Pacific Octopus is the largest species of octopus and a master of intelligence and disguise. It can change its color and texture in a fraction of a second to camouflage itself or communicate.',
    image:
      'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2lhbnQlMjBQYWNpZmljJTIwT2N0b3B1c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Cold, temperate waters of the North Pacific. Found from shallow tidal pools to depths of 2,000 meters. They live in rocky dens, caves, or under ledges.',
    diet: 'Carnivorous. Preys on crabs, clams, scallops, shrimp, and small fish, which it cracks open with its powerful, beak-like mouth.',
    ecology:
      'As a large predator, the Giant Pacific Octopus helps control populations of crustaceans and other invertebrates. They are, in turn, prey for seals, sea lions, and large fish.',
    behavior:
      'These octopuses are highly intelligent and curious, known to solve complex mazes, open jars, and even recognize individual humans in captivity. They are solitary and territorial. The female dies shortly after her eggs hatch, having guarded them for months without eating.',
    interestingFact:
      'A Giant Pacific Octopus has three hearts, nine brains (one central brain and one in each arm), and blue, copper-based blood.',
    funFacts: [
      'They are masters of escape, able to squeeze their entire, boneless body through any opening larger than their beak.',
      'They can weigh over 100 pounds and have an arm span of 20 feet.',
      'When threatened, they can squirt a cloud of ink to blind a predator and escape.',
    ],
    optimalConditions: {
      temperature: { min: 7, max: 15 },
      salinity: { min: 33, max: 37 },
      depth: { min: 0, max: 2000 },
    },
    threats: [
      'Pollution',
      'Habitat degradation',
      'Overfishing (of prey)',
      'Climate change',
    ],
  },
  {
    id: '10',
    name: 'Kelp Forests',
    scientificName: 'Laminariales',
    description:
      'Kelp forests are towering underwater "forests" formed by the dense growth of large brown algae (kelp). They are among the most productive and dynamic ecosystems on Earth.',
    image:
      'https://images.unsplash.com/photo-1717292742863-ad9bb0e95f88?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEtlbHAlMjBGb3Jlc3RzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Cool, nutrient-rich, coastal waters with hard, rocky bottoms. They require sunlight for photosynthesis and are limited to depths of about 20-40 meters.',
    diet: 'Not applicable (Algae). As primary producers, kelp forms the base of the food web, supporting a vast community of animals through direct grazing and detritus.',
    ecology:
      'Kelp forests are biodiversity hotspots. They provide a three-dimensional habitat and food source for hundreds of species, including sea otters, sea lions, fish, sea urchins, and crustaceans. They also dampen wave action and reduce coastal erosion.',
    behavior:
      'Kelp can grow incredibly fast—up to two feet (60 cm) in a single day under ideal conditions. They are anchored to the seafloor by a "holdfast" and float upwards thanks to gas-filled bladders called "pneumatocysts".',
    interestingFact: 'Kelp is not a plant; it is a type of brown algae (protist).',
    funFacts: [
      'Many products, including ice cream, toothpaste, and shampoo, contain a kelp-derived ingredient called algin.',
      'The health of kelp forests is often dependent on sea otters, which prey on kelp-eating sea urchins.',
      'Kelp forests "breathe" vast amounts of CO2 from the atmosphere.',
    ],
    optimalConditions: {
      temperature: { min: 5, max: 20 },
      salinity: { min: 32, max: 36 },
      depth: { min: 2, max: 40 },
    },
    threats: [
      'Climate change (warming waters)',
      'Overgrazing by sea urchins',
      'Pollution',
      'Coastal development',
      'Storms',
    ],
  },
  {
    id: '11',
    name: 'Manatee',
    scientificName: 'Trichechus',
    description:
      'Manatees, often called "sea cows," are large, fully aquatic, herbivorous marine mammals. They are gentle, slow-moving animals known for their curious and friendly nature.',
    image:
      'https://plus.unsplash.com/premium_photo-1661865806378-3d405a6d747c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWFuYXRlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Warm, shallow, slow-moving rivers, estuaries, saltwater bays, and coastal areas. They cannot survive in water below 20°C (68°F) and migrate to warm-water springs in winter.',
    diet: 'Herbivorous. Feeds on seagrass, algae, and other aquatic plants. They graze for 6-8 hours a day, consuming 10-15% of their body weight.',
    ecology:
      'Manatees are "ecosystem engineers" through their grazing, which helps maintain the health of seagrass beds by "mowing" them and preventing overgrowth.',
    behavior:
      'Manatees are semi-social. They are often seen alone or in small groups, but they will congregate in large numbers at warm-water sites during cold weather. They communicate using chirps, squeals, and whistles.',
    interestingFact:
      'Manatees are most closely related to the elephant, not whales or dolphins.',
    funFacts: [
      'They have no natural predators, but are highly threatened by humans.',
      'Manatee teeth are constantly replaced. New teeth grow in the back and move forward, pushing old teeth out.',
      'They can hold their breath for up to 20 minutes, but usually surface every 3-5 minutes.',
    ],
    optimalConditions: {
      temperature: { min: 20, max: 30 },
      salinity: { min: 0, max: 35 },
      depth: { min: 1, max: 6 },
    },
    threats: [
      'Vessel strikes',
      'Habitat degradation',
      'Seagrass loss',
      'Red tide blooms',
      'Entanglement in fishing gear',
      'Cold stress',
    ],
  },
  {
    id: '12',
    name: 'Leatherback Sea Turtle',
    scientificName: 'Dermochelys coriacea',
    description:
      'The Leatherback is the largest of all living turtles and a true ocean giant. It is unique for its shell, which is not a hard, bony plate, but rather a flexible, leathery, oil-saturated skin over a mosaic of small bones.',
    image:
      'https://plus.unsplash.com/premium_photo-1733266978466-2eec05c51a58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGVhdGhlcmJhY2slMjBTZWElMjBUdXJ0bGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Primarily pelagic (open ocean). The most wide-ranging of all sea turtles, found from the tropics to sub-arctic waters, thanks to its ability to regulate its body temperature.',
    diet: 'Almost exclusively jellyfish and other soft-bodied invertebrates like tunicates and salps. Their throat is lined with backward-pointing spines to trap their slippery prey.',
    ecology:
      'Leatherbacks play a crucial role in controlling populations of jellyfish, which can otherwise bloom and disrupt food webs.',
    behavior:
      'Leatherbacks are one of the deepest-diving marine animals, capable of diving to depths of 1,200 meters (4,000 feet) in search of prey. They undertake the longest migrations of any sea turtle, crossing entire ocean basins.',
    interestingFact:
      'The Leatherback Sea Turtle is a "living fossil," the last remaining species of a family of turtles that has been around for over 100 million years.',
    funFacts: [
      'They can be as long as a car and weigh up to 2,000 pounds.',
      'They are partially warm-blooded, which allows them to survive in very cold water.',
      'They tragically mistake plastic bags for jellyfish, which is a major cause of death.',
    ],
    optimalConditions: {
      temperature: { min: 10, max: 30 },
      salinity: { min: 30, max: 37 },
      depth: { min: 0, max: 1200 },
    },
    threats: [
      'Entanglement in fishing gear',
      'Plastic ingestion',
      'Egg harvesting',
      'Coastal development (on nesting beaches)',
      'Vessel strikes',
    ],
  },
  {
    id: '13',
    name: 'Bottlenose Dolphin',
    scientificName: 'Tursiops truncatus',
    description:
      'A well-known and charismatic species of dolphin, the Bottlenose is characterized by its high intelligence, complex social structures, and "smiling" appearance due to its short, stubby beak.',
    image:
      'https://plus.unsplash.com/premium_photo-1664303478026-d4030f79eda4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Qm90dGxlbm9zZSUyMERvbHBoaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Temperate and tropical waters worldwide. Found in both coastal (inshore) and offshore populations, inhabiting bays, estuaries, and the open ocean.',
    diet: 'A wide variety of fish, squid, and crustaceans. They are highly skilled, cooperative hunters, using echolocation to find prey and techniques like "bubble-netting" or "strand-feeding".',
    ecology:
      'As a top predator, dolphins help regulate fish populations. Their presence is often an indicator of a healthy marine ecosystem.',
    behavior:
      'Dolphins live in complex social groups called "pods." They are one of the few animals to have "names," using unique "signature whistles" to identify and call each other. They are highly playful and are known to surf waves and interact with other species.',
    interestingFact:
      "Bottlenose Dolphins have the longest social memory in the animal kingdom, able to remember the whistles of other dolphins they haven't seen in over 20 years.",
    funFacts: [
      'They sleep with one half of their brain at a time, allowing them to continue breathing and watch for predators.',
      'They can use tools, such as using sea sponges to protect their noses while foraging on the seafloor.',
      'Dolphins can recognize themselves in a mirror.',
    ],
    optimalConditions: {
      temperature: { min: 10, max: 32 },
      salinity: { min: 25, max: 38 },
      depth: { min: 0, max: 600 },
    },
    threats: [
      'Entanglement in fishing gear',
      'Pollution (chemical and plastic)',
      'Habitat degradation',
      'Ocean noise pollution',
      'Disease',
    ],
  },
  {
    id: '14',
    name: 'Manta Ray',
    scientificName: 'Manta birostris',
    description:
      "The Manta Ray is the world's largest ray, a gentle giant with a wingspan of up to 7 meters (23 feet). They are filter-feeders that \"fly\" gracefully through the water using their large pectoral fins.",
    image:
      'https://plus.unsplash.com/premium_photo-1661963626161-0fb7da616bd1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWFudGElMjBSYXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Tropical, subtropical, and temperate waters worldwide. They migrate long distances and are often found near "cleaning stations" on coral reefs, where small fish clean them of parasites.',
    diet: 'Filter-feeder. Primarily zooplankton, which they funnel into their mouths using their two "cephalic lobes." They often perform backward somersaults to stay in a dense patch of plankton.',
    ecology:
      'Manta rays help regulate plankton levels and are a key part of the marine ecosystem. Their presence supports a significant ecotourism industry, which helps protect coral reefs.',
    behavior:
      'Manta Rays are highly intelligent and social. They are known to engage in coordinated group feeding and playful behavior. They have the largest brain-to-body size ratio of any fish.',
    interestingFact:
      'Manta Rays have unique spot patterns on their bellies that are like a human fingerprint, allowing researchers to identify individual rays.',
    funFacts: [
      'They are known to leap entirely out of the water, a behavior called "breaching".',
      'They must swim constantly to keep oxygen-rich water flowing over their gills.',
      'Unlike stingrays, Manta Rays do not have a stinging barb in their tail.',
    ],
    optimalConditions: {
      temperature: { min: 20, max: 29 },
      salinity: { min: 33, max: 37 },
      depth: { min: 0, max: 1000 },
    },
    threats: [
      'Overfishing (targeted for their gill plates for use in traditional medicine)',
      'Bycatch',
      'Vessel strikes',
      'Plastic pollution',
      'Climate change',
    ],
  },
  {
    id: '15',
    name: 'Humpback Whale',
    scientificName: 'Megaptera novaeangliae',
    description:
      'The Humpback Whale is a large baleen whale famous for its spectacular acrobatic displays (breaching) and its complex, haunting songs, which can last for hours.',
    image:
      'https://plus.unsplash.com/premium_photo-1661847613093-bbb6d1c0f73a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SHVtcGJhY2slMjBXaGFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'All major oceans. They undertake one of the longest migrations of any mammal, traveling thousands of miles from cold polar feeding grounds to warm tropical breeding grounds.',
    diet: 'Krill and small fish, such as herring and mackerel. They are famous for their "bubble-net feeding" technique, where a group of whales swims in a circle, blowing bubbles to create a "net" to trap fish.',
    ecology:
      'Humpbacks play a role in nutrient cycling by bringing nutrient-rich water from the depths to the surface. Their fecal plumes also fertilize phytoplankton.',
    behavior:
      'Humpbacks are incredibly social. The males "sing" complex songs, which are unique to each population and change from year to year, likely to attract mates or establish territory.',
    interestingFact:
      "The Humpback Whale's pectoral fins (flippers) are the longest of any cetacean and can be up to 16 feet (5 meters) long, which is one-third of its total body length.",
    funFacts: [
      'The "knobs" on a humpback\'s head are called tubercles, and each one contains a single hair.',
      'The unique patterns on the underside of their tail flukes are used to identify individual whales, just like a fingerprint.',
      'Their name comes from the "hump" on their back, which is visible as they arch their back to dive.',
    ],
    optimalConditions: {
      temperature: { min: 5, max: 25 },
      salinity: { min: 31, max: 37 },
      depth: { min: 0, max: 300 },
    },
    threats: [
      'Entanglement in fishing gear',
      'Vessel strikes',
      'Ocean noise pollution',
      'Climate change',
    ],
  },
  {
    id: '16',
    name: 'Seagrass Meadows',
    scientificName: 'Zosteraceae',
    description:
      'Seagrass meadows are underwater "prairies" of flowering plants—not algae—that are critical for marine life. They are one of the most productive ecosystems in the world.',
    image:
      'https://plus.unsplash.com/premium_photo-1709492256519-482979d330eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2VhZ3Jhc3MlMjBNZWFkb3dzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Shallow, sheltered coastal waters with sandy or muddy bottoms in both temperate and tropical regions. They require ample sunlight to photosynthesize.',
    diet: 'Not applicable (Plant). They are primary producers, but are also a key food source for herbivores like manatees, dugongs, green sea turtles, and geese.',
    ecology:
      'Seagrass meadows are vital. They act as a nursery for juvenile fish, improve water quality by filtering sediment, and sequester massive amounts of carbon ("blue carbon"). They also dampen wave energy and protect coastlines.',
    behavior:
      'Seagrasses are the only flowering plants that can live entirely underwater. They reproduce both by spreading runners (rhizomes) under the sediment and by producing flowers and seeds that are dispersed by water currents.',
    interestingFact:
      'Seagrass meadows can store up to twice as much carbon per acre as terrestrial forests, playing a huge role in fighting climate change.',
    funFacts: [
      'They are not seaweeds (which are algae); they are true plants with roots, stems, and flowers.',
      'One-third of all coastal fish species spend at least part of their lives in seagrass beds.',
      'They help oxygenate the water around them.',
    ],
    optimalConditions: {
      temperature: { min: 15, max: 30 },
      salinity: { min: 20, max: 40 },
      depth: { min: 0, max: 20 },
    },
    threats: [
      'Coastal development',
      'Pollution (especially nutrient runoff)',
      'Dredging',
      'Eutrophication (algal blooms blocking light)',
      'Climate change',
      'Boating scars',
    ],
  },
  {
    id: '17',
    name: 'Common Cuttlefish',
    scientificName: 'Sepia officinalis',
    description:
      'A master of camouflage, the Cuttlefish is a cephalopod that can change its skin color and texture in an instant to blend in with its surroundings or mesmerize prey. It has a unique, internal, gas-filled shell called a cuttlebone.',
    image:
      'https://plus.unsplash.com/premium_photo-1661964453866-1ee129a25078?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q29tbW9uJTIwQ3V0dGxlZmlzaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Shallow, temperate, and tropical coastal waters, particularly over sandy or muddy bottoms where they can burrow and hide.',
    diet: 'Carnivorous. Preys on small fish, crabs, shrimp, and other crustaceans, which it catches with two long, extendable feeding tentacles.',
    ecology:
      'Cuttlefish are an important link in the food web, acting as both predator and prey for larger fish, sharks, and marine mammals.',
    behavior:
      'Cuttlefish have one of the most sophisticated "languages" in the animal kingdom, using their chromatophores (color-changing cells) to create complex, flickering patterns for communication, camouflage, and to warn off rivals.',
    interestingFact:
      'Cuttlefish have "W"-shaped pupils, which give them a very wide field of vision and help them detect light polarization, which humans cannot see.',
    funFacts: [
      'They are considered one of the most intelligent invertebrates.',
      "The cuttlebone is porous and used by the cuttlefish to control its buoyancy, like a submarine's ballast tank.",
      'They have three hearts and blue-green, copper-based blood.',
    ],
    optimalConditions: {
      temperature: { min: 10, max: 25 },
      salinity: { min: 30, max: 38 },
      depth: { min: 1, max: 200 },
    },
    threats: [
      'Overfishing',
      'Pollution',
      'Habitat degradation',
      'Climate change',
    ],
  },
  {
    id: '18',
    name: 'Walrus',
    scientificName: 'Odobenus rosmarus',
    description:
      'A large, social marine mammal easily recognized by its long tusks, prominent "whiskers" (vibrissae), and massive, blubbery body. They are found in the Arctic.',
    image:
      'https://images.unsplash.com/photo-1460899960812-f6ee1ecaf117?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2FscnVzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Arctic Ocean and subarctic seas. They rely on sea ice for resting, breeding, and giving birth. They forage for food on the "benthic" seafloor.',
    diet: 'Primarily benthic invertebrates, especially clams, which they find using their sensitive whiskers and suck out of their shells with powerful suction.',
    ecology:
      'Walruses are important to the Arctic ecosystem as they "till" the seafloor while foraging, releasing nutrients that support other organisms. They are prey for orcas and polar bears.',
    behavior:
      'Walruses are extremely social, congregating in large groups called "haul-outs" on ice floes or rocky beaches. The tusks are used by both sexes to fight, display dominance, and haul themselves out of the water (hence their name, "tooth-walking" in Latin).',
    interestingFact:
      "A Walrus's tusks are actually elongated canine teeth that grow continuously throughout its life.",
    funFacts: [
      'Their whiskers (vibrissae) are super-sensitive, with over 400 on their snout to find food in dark, muddy water.',
      'They can slow their heartbeat to survive in frigid water.',
      'A large male walrus can weigh over 4,000 pounds (1,800 kg).',
    ],
    optimalConditions: {
      temperature: { min: -5, max: 10 },
      salinity: { min: 30, max: 35 },
      depth: { min: 0, max: 80 },
    },
    threats: [
      'Climate change',
      'Sea ice loss (forcing them onto crowded beaches)',
      'Ocean noise pollution',
      'Shipping traffic',
      'Pollution',
    ],
  },
  {
    id: '19',
    name: 'Green Sea Turtle',
    scientificName: 'Chelonia mydas',
    description:
      'A large, migratory sea turtle with a heart-shaped shell. Despite its name, its shell is usually brown or olive. It is named for the green color of the fat and cartilage found under its shell.',
    image:
      'https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R3JlZW4lMjBTZWElMjBUdXJ0bGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Endangered',
    habitat:
      'Tropical and subtropical oceans worldwide. They inhabit coastal areas, feeding in seagrass beds, and nesting on sandy beaches. They are highly migratory.',
    diet: 'Adults are almost exclusively herbivorous, feeding on seagrass and algae. Juveniles are omnivorous, eating invertebrates like crabs and jellyfish.',
    ecology:
      'Green Sea Turtles are crucial for maintaining healthy seagrass beds. By grazing, they "mow" the seagrass, keeping it healthy and productive, which in turn supports many other species.',
    behavior:
      "Like other sea turtles, Green Sea Turtles return to the very beaches where they were born to lay their own eggs, often traveling thousands of miles to get there. How they navigate remains a scientific mystery, but they likely use the Earth's magnetic field.",
    interestingFact:
      'Green Sea Turtles can hold their breath for hours at a time while resting or sleeping underwater.',
    funFacts: [
      'They can live to be 80 years old or more.',
      'The temperature of the sand determines the sex of the hatchlings: warmer sand produces more females, cooler sand produces more males.',
      'They cannot retract their head or flippers into their shell.',
    ],
    optimalConditions: {
      temperature: { min: 20, max: 30 },
      salinity: { min: 30, max: 37 },
      depth: { min: 0, max: 50 },
    },
    threats: [
      'Entanglement in fishing gear',
      'Habitat degradation (of seagrass and nesting beaches)',
      'Egg harvesting',
      'Coastal development',
      'Vessel strikes',
      'Plastic ingestion',
    ],
  },
  {
    id: '20',
    name: 'Orca (Killer Whale)',
    scientificName: 'Orcinus orca',
    description:
      'The Orca, or Killer Whale, is a highly intelligent and social apex predator. It is the largest member of the dolphin family, with distinctive black-and-white coloring and a powerful presence.',
    image:
      'https://images.unsplash.com/photo-1661238791648-4cb796dfd82a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T3JjYSUyMChLaWxsZXIlMjBXaGFsZSl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Data Deficient',
    habitat:
      'All oceans, from the cold Arctic and Antarctic regions to tropical seas. Different "ecotypes" (populations) specialize in different habitats and prey.',
    diet: 'Highly varied. Some ecotypes eat only fish (like salmon), while others hunt marine mammals like seals, sea lions, dolphins, and even large whales. They use sophisticated, cooperative hunting strategies.',
    ecology:
      'As apex predators, Orcas have a profound impact on the ocean. They regulate populations of their prey, and different ecotypes have unique ecological roles. Some populations are "transient" (hunting mammals) while others are "resident" (hunting fish).',
    behavior:
      'Orcas live in complex, matrilineal societies (pods) centered around the oldest female. They have "cultures"—unique, learned behaviors (like hunting techniques and vocalizations) that are passed down through generations.',
    interestingFact:
      'Orcas are not whales; they are the largest species of dolphin.',
    funFacts: [
      'No two orcas have the same "saddle patch" (the grey patch behind the dorsal fin), which is used to identify them.',
      'They use echolocation to navigate and find prey in dark water.',
      "A wild orca's dorsal fin is tall and straight; the collapsed fins seen in captivity are a sign of poor health or stress.",
    ],
    optimalConditions: {
      temperature: { min: 0, max: 30 },
      salinity: { min: 30, max: 38 },
      depth: { min: 0, max: 1000 },
    },
    threats: [
      'Pollution (especially PCBs, which build up in their blubber)',
      'Prey depletion (e.g., lack of salmon)',
      'Ocean noise pollution',
      'Vessel strikes',
      'Climate change',
    ],
  },
  {
    id: '21',
    name: 'Whale Shark',
    scientificName: 'Rhincodon typus',
    description:
      'The Whale Shark is the largest fish in the sea and a true gentle giant. Despite its immense size, it is a filter-feeder that poses no threat to humans.',
    image:
      'https://plus.unsplash.com/premium_photo-1661864349303-d028cff528b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2hhbGUlMjBTaGFya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Endangered',
    habitat:
      'Tropical and warm-temperate oceans. They are pelagic but congregate in coastal areas with seasonal plankton blooms, such as Ningaloo Reef (Australia) and the Yucatan Peninsula (Mexico).',
    diet: 'Filter-feeder. Eats plankton, krill, small fish, and squid by swimming with its enormous mouth (up to 5 feet wide) open, filtering water through its gills.',
    ecology:
      'As large filter-feeders, whale sharks help regulate plankton populations. Their migratory patterns are often linked to major plankton and fish-spawning events.',
    behavior:
      'Whale Sharks are slow, solitary swimmers, but they aggregate in large numbers at seasonal feeding hotspots. They are known to be docile and curious, often allowing swimmers to approach them (though this should be done respectfully).',
    interestingFact:
      'The spot pattern on each Whale Shark is unique, like a human fingerprint, and is used by scientists for identification.',
    funFacts: [
      'They are a shark, not a whale, but they feed like a whale.',
      'They can grow up to 40 feet (12 meters) long or more.',
      'They are "ovoviviparous," meaning their eggs hatch inside the mother, and she gives birth to live young.',
    ],
    optimalConditions: {
      temperature: { min: 21, max: 30 },
      salinity: { min: 33, max: 37 },
      depth: { min: 0, max: 700 },
    },
    threats: [
      'Vessel strikes',
      'Bycatch',
      'Targeted fishing',
      'Plastic pollution',
      'Disturbance from tourism',
    ],
  },
  {
    id: '22',
    name: 'Hawksbill Sea Turtle',
    scientificName: 'Eretmochelys imbricata',
    description:
      'A critically endangered sea turtle known for its narrow, pointed beak (like a hawk) and a beautifully patterned shell that has been tragically exploited for "tortoiseshell" products.',
    image:
      'https://plus.unsplash.com/premium_photo-1684943834601-3a5e8e8f7005?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGF3a3NiaWxsJTIwU2VhJTIwVHVydGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Critically Endangered',
    habitat:
      'Tropical reefs, lagoons, and estuaries worldwide. They are highly migratory and use a variety of habitats, but are most strongly associated with coral reefs.',
    diet: 'Primarily sea sponges. Their specialized, narrow beak allows them to reach into coral reef crevices to pull out sponges, their main food source. This diet makes their flesh toxic to humans.',
    ecology:
      'By feeding on sponges, Hawksbills play a crucial role in reef health, preventing sponges from out-competing and smothering slow-growing corals.',
    behavior:
      'Hawksbills are solitary for most of their lives. Females return to their natal beaches to nest, often in secluded, vegetated areas. They are known to be very precise in their navigation.',
    interestingFact:
      'The Hawksbill\'s "tortoiseshell" is made of overlapping plates called scutes, which are uniquely patterned and were once used for jewelry and ornaments.',
    funFacts: [
      'They are essential to the health of coral reefs.',
      'Their diet is so specialized that they are one of the few animals that can eat certain sea sponges.',
      'The beautiful shell patterns are unique to each individual.',
    ],
    optimalConditions: {
      temperature: { min: 24, max: 30 },
      salinity: { min: 30, max: 37 },
      depth: { min: 0, max: 20 },
    },
    threats: [
      'Shell trade (tortoiseshell)',
      'Egg harvesting',
      'Habitat degradation (of reefs and nesting beaches)',
      'Coral bleaching',
      'Entanglement in fishing gear',
      'Plastic ingestion',
    ],
  },
  {
    id: '23',
    name: 'Sea Lion (California)',
    scientificName: 'Zalophus californianus',
    description:
      'A highly intelligent and social marine mammal known for its "barking" vocalizations, playful "surfing" behavior, and ability to be trained, often seen in aquariums and marine parks.',
    image:
      'https://plus.unsplash.com/premium_photo-1667099521647-c2cf2ee2300a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2VhJTIwTGlvbiUyMChDYWxpZm9ybmlhKXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'West coast of North America, from Vancouver Island, Canada, to central Mexico. They breed on sandy or rocky islands and haul-out on beaches, piers, and buoys.',
    diet: 'Opportunistic feeders. Eat squid, octopus, herring, mackerel, rockfish, and anchovies. They are skilled hunters, often working together.',
    ecology:
      'Sea Lions are an important predator, controlling populations of squid and fish. They are also prey for apex predators like Orcas and Great White Sharks.',
    behavior:
      'Sea Lions are "pinnipeds" (fin-footed) that can "walk" on land by rotating their large hind flippers forward, unlike seals. They are extremely social, forming large colonies that can number in the thousands.',
    interestingFact:
      'Male sea lions (bulls) are much larger than females (cows) and establish breeding territories called "rookeries," which they defend aggressively.',
    funFacts: [
      'You can tell a sea lion from a seal: sea lions have external ear flaps and can walk on their flippers.',
      'They are known for their intelligence and playfulness.',
      'A large bull can weigh up to 850 pounds (390 kg).',
    ],
    optimalConditions: {
      temperature: { min: 10, max: 25 },
      salinity: { min: 32, max: 36 },
      depth: { min: 0, max: 300 },
    },
    threats: [
      'Entanglement in fishing gear',
      'Pollution',
      'Climate change (prey shifts)',
      'Disease (from domoic acid)',
      'Boat strikes',
    ],
  },
  {
    id: '24',
    name: 'Beluga Whale',
    scientificName: 'Delphinapterus leucas',
    description:
      'An Arctic whale known as the "canary of the sea" for its incredibly diverse and vocal range of chirps, clicks, whistles, and squeals. They are pure white as adults and have a flexible neck.',
    image:
      'https://plus.unsplash.com/premium_photo-1682308338523-5a4749d3e956?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmVsdWdhJTIwV2hhbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Near Threatened',
    habitat:
      'Arctic and sub-Arctic waters. They inhabit cold coastal waters, estuaries, and sometimes even travel up rivers. They are highly adapted to life near sea ice.',
    diet: 'Carnivorous. Eats a wide variety of fish (salmon, cod, herring), squid, octopus, and crustaceans. They are flexible feeders.',
    ecology:
      'Belugas are an important part of the Arctic food web. They are prey for Orcas and Polar Bears and help regulate fish and invertebrate populations.',
    behavior:
      'Belugas are extremely social, forming pods (groups) that can number in the hundreds. They have a prominent "melon" on their head, a fatty organ that they can change the shape of to focus their echolocation clicks.',
    interestingFact:
      'Beluga Whales are one of the only cetaceans that can turn their heads and nod, thanks to their unfused neck vertebrae.',
    funFacts: [
      'They are born grey or brown and turn white as they mature, at around 5-10 years old.',
      'They shed their skin (molt) each year by rubbing against gravelly river bottoms.',
      'They can "spy-hop" and "log-hop" (float motionlessly) at the surface.',
    ],
    optimalConditions: {
      temperature: { min: 0, max: 15 },
      salinity: { min: 28, max: 35 },
      depth: { min: 0, max: 800 },
    },
    threats: [
      'Climate change',
      'Sea ice loss',
      'Ocean noise pollution',
      'Pollution (heavy metals)',
      'Shipping traffic',
      'Oil and gas development',
    ],
  },
  {
    id: '25',
    name: 'Nautilus',
    scientificName: 'Nautilidae',
    description:
      'A "living fossil" cephalopod that has survived with very little change for over 500 million years, even before the dinosaurs. It lives in a distinctive, beautiful, chambered shell.',
    image:
      'https://images.unsplash.com/photo-1700164748020-263700047c4b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmF1dGlsdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Deep slopes of coral reefs in the tropical Indo-Pacific. They live at depths of 100-700 meters during the day and migrate vertically to shallower water at night to feed.',
    diet: 'Scavenger and predator. Feeds on crustaceans (shrimp, crabs), carrion, and fish, which it grasps with its many (up to 90) sticky, suckerless tentacles.',
    ecology:
      'The Nautilus is a slow-moving scavenger that plays a role in cleaning the deep-reef environment. It is part of a unique, ancient lineage of cephalopods.',
    behavior:
      'The Nautilus controls its buoyancy using its chambered shell. It pumps gas and liquid into or out of the chambers through a tube called a "siphuncle," allowing it to rise or sink, much like a submarine.',
    interestingFact:
      'The "golden spiral" pattern of the Nautilus shell is a perfect example of a logarithmic spiral, a famous mathematical pattern found in nature.',
    funFacts: [
      'They are the only cephalopod (squid/octopus family) with an external shell.',
      'They have poor, pinhole-camera-like eyes, unlike the sharp eyes of squid and octopuses.',
      'They can live for over 20 years, which is extremely long for a cephalopod.',
    ],
    optimalConditions: {
      temperature: { min: 8, max: 20 },
      salinity: { min: 33, max: 36 },
      depth: { min: 100, max: 700 },
    },
    threats: [
      'Overfishing (for their beautiful shells)',
      'Habitat degradation',
      'Ocean acidification',
      'Slow reproduction rate',
    ],
  },
  {
    id: '26',
    name: 'Atlantic Puffin',
    scientificName: 'Fratercula arctica',
    description:
      'A species of seabird, often called the "clown of the sea" or "sea parrot" due to its brightly colored, triangular beak, which is only vibrant during the spring breeding season.',
    image:
      'https://images.unsplash.com/photo-1694407116765-b21b4e80e722?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXRsYW50aWMlMjBQdWZmaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Nests in large colonies on coastal cliffs and remote islands in the North Atlantic (like Iceland and Norway). Spends its winters far out at sea in the open ocean.',
    diet: 'Small fish, such as sandeels, herring, and hake, which they catch by "flying" underwater, using their wings to propel themselves.',
    ecology:
      'Puffins are an indicator species for the health of North Atlantic fisheries. Their breeding success is directly tied to the availability of small fish.',
    behavior:
      'Puffins are "pelagic" (sea-dwelling) for most of the year. They are excellent swimmers and divers. During breeding season, they return to land and nest in burrows, which they dig into the soil.',
    interestingFact:
      'A Puffin can carry an average of 10-12 fish in its beak at one time, but the record is 62!',
    funFacts: [
      'Their colorful beak fades to a dull grey during the winter.',
      'They are awkward on land but incredibly agile in the water and air.',
      'Puffins mate for life and often return to the same burrow each year.',
    ],
    optimalConditions: {
      temperature: { min: 0, max: 15 },
      salinity: { min: 30, max: 36 },
      depth: { min: 0, max: 60 },
    },
    threats: [
      'Overfishing (of their prey)',
      'Climate change (shifting fish stocks)',
      'Pollution (oil spills)',
      'Invasive predators (on nesting sites)',
      'Extreme weather',
    ],
  },
  {
    id: '27',
    name: 'Giant Clam',
    scientificName: 'Tridacna gigas',
    description:
      'The largest living bivalve mollusk on Earth, the Giant Clam is a magnificent inhabitant of coral reefs. It can weigh over 200 kg (500 lbs) and live for over 100 years.',
    image:
      'https://images.unsplash.com/photo-1705634886166-e52757fff6fa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2lhbnQlMjBDbGFtfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Shallow, warm coral reefs in the South Pacific and Indian Oceans. They attach to rocky or sandy bottoms and remain in one spot for their entire lives.',
    diet: 'Dual-feeder. It is a filter-feeder, drawing in water to filter out plankton. It also gets most of its nutrition from symbiotic zooxanthellae (algae) living in its vibrant, fleshy mantle.',
    ecology:
      'Giant Clams are important reef-builders. They provide food, shelter, and substrate for other reef organisms. Their filtering action also helps to clean the water.',
    behavior:
      'The clam\'s brilliantly colored mantle acts like a "garden" for its symbiotic algae, which it exposes to sunlight for photosynthesis. If threatened, the clam can snap its massive shell shut with surprising speed.',
    interestingFact:
      'Giant Clams cannot close their shells completely once they reach a large size, as their fleshy mantle is too big to retract fully.',
    funFacts: [
      'They are not "man-eaters"; legends of them trapping divers are myths.',
      'The vibrant colors (blue, green, purple) are pigments in the mantle that protect the algae from too much sun.',
      'They are hermaphrodites, producing both sperm and eggs.',
    ],
    optimalConditions: {
      temperature: { min: 24, max: 30 },
      salinity: { min: 32, max: 36 },
      depth: { min: 1, max: 20 },
    },
    threats: [
      'Overharvesting (for food and shells)',
      'Pollution',
      'Coral bleaching',
      'Habitat degradation',
      'Collection for aquariums',
    ],
  },
  {
    id: '28',
    name: 'American Lobster',
    scientificName: 'Homarus americanus',
    description:
      'A large, hard-shelled crustacean found on the Atlantic coast of North America. It is a highly valuable commercial species known for its powerful claws and long lifespan.',
    image:
      'https://media.istockphoto.com/id/1959927859/photo/lobster-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=_MqF-rFo6obkoQ2w__Doi_WTPKBzzV6fuw70etkUehU=',
    conservationStatus: 'Least Concern',
    habitat:
      'Cold, rocky, and sandy bottoms from shallow waters near the coast to the edge of the continental shelf.',
    diet: 'Opportunistic scavenger and predator. Eats fish, crabs, clams, mussels, sea urchins, and even other lobsters. They are primarily nocturnal feeders.',
    ecology:
      'Lobsters are an important link in the food web. They help control populations of their prey and are a food source for large fish (like cod), seals, and humans.',
    behavior:
      'Lobsters must "molt" (shed their shell) in order to grow, leaving them vulnerable until their new shell hardens. They have two different claws: a large "crusher" claw for smashing, and a "cutter" claw with a sharper edge.',
    interestingFact:
      'Lobsters can live to be over 100 years old if left undisturbed in the wild, and they never stop growing.',
    funFacts: [
      'Lobsters are not naturally red; they are a mottled, dark blue or greenish-brown, and only turn red when cooked.',
      'They "taste" with their legs and "chew" with their stomachs (using a "gastric mill").',
      'They can regenerate lost limbs over a series of molts.',
    ],
    optimalConditions: {
      temperature: { min: 5, max: 20 },
      salinity: { min: 25, max: 35 },
      depth: { min: 1, max: 700 },
    },
    threats: [
      'Overfishing',
      'Climate change (warming waters are shifting their range north)',
      'Ocean acidification (weakening their shells)',
      'Shell disease',
    ],
  },
  {
    id: '29',
    name: 'Polar Bear',
    scientificName: 'Ursus maritimus',
    description:
      'The Polar Bear is a large carnivorous bear native to the Arctic Circle. It is classified as a marine mammal because it spends most of its life on the sea ice of the Arctic Ocean.',
    image:
      'https://images.unsplash.com/flagged/photo-1591475791029-f9efe6297456?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UG9sYXIlMjBCZWFyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Arctic sea ice, which they use as a platform to hunt seals at breathing holes. They are found in 19 populations across 5 nations (USA, Canada, Russia, Greenland, Norway).',
    diet: 'Primarily ringed and bearded seals, which they hunt from the ice. They are apex predators and will also scavenge whale carcasses.',
    ecology:
      'As the apex predator of the Arctic, the Polar Bear is essential for regulating seal populations. Its survival is inextricably linked to the presence of sea ice.',
    behavior:
      'Polar Bears are solitary animals. They are powerful swimmers, capable of swimming for days at a time. Pregnant females will dig a den in the snow and give birth, nursing their cubs for months without eating.',
    interestingFact:
      "Underneath their thick white fur, a Polar Bear's skin is black, which helps them absorb sunlight and stay warm.",
    funFacts: [
      'Their fur is not white; it is translucent and hollow, which reflects light and traps heat.',
      'They can smell a seal from over a kilometer away and under 3 feet of snow.',
      'They are the largest land carnivore in the world.',
    ],
    optimalConditions: {
      temperature: { min: -30, max: 10 },
      salinity: { min: 28, max: 34 },
      depth: { min: 0, max: 10 },
    },
    threats: [
      'Climate change',
      'Sea ice loss (their primary threat)',
      'Pollution (PCBs)',
      'Oil and gas development',
      'Human-wildlife conflict',
    ],
  },
  {
    id: '30',
    name: 'Narwhal',
    scientificName: 'Monodon monoceros',
    description:
      'The Narwhal is a medium-sized toothed whale known as the "unicorn of the sea." The male (and occasionally females) possesses a long, spiral tusk, which is actually a protruding canine tooth.',
    image:
      'https://media.istockphoto.com/id/2166801275/photo/narwhal-male-whales.webp?a=1&b=1&s=612x612&w=0&k=20&c=BFit2x3kgq9avdA11fl4nGzdcToongQqg_ufv5Ae3gw=',
    conservationStatus: 'Near Threatened',
    habitat:
      'Arctic waters around Greenland, Canada, and Russia. They are deep-diving whales that rely on sea ice, migrating to "leads" (cracks in the ice) to breathe.',
    diet: 'A specialized diet of halibut, cod, squid, and shrimp, which they find in the dark, deep waters using echolocation.',
    ecology:
      'Narwhals are a key predator in the Arctic deep-water ecosystem. They are prey for Orcas and, occasionally, Polar Bears.',
    behavior:
      'Narwhals are social whales that travel in pods. The true purpose of the tusk is still debated, but it is believed to be a sensory organ, packed with millions of nerve endings, used to detect changes in water temperature, salinity, and pressure. It may also be used for "tusk-dueling" to establish dominance.',
    interestingFact:
      'The Narwhal\'s tusk is the only known spiral tooth, and it always (or almost always) spirals to the left.',
    funFacts: [
      'The tusk can grow up to 10 feet (3 meters) long.',
      'Narwhals can dive to depths of 1,500 meters (5,000 feet).',
      'They have no dorsal fin, which is an adaptation for living under sea ice.',
    ],
    optimalConditions: {
      temperature: { min: -1, max: 8 },
      salinity: { min: 31, max: 35 },
      depth: { min: 50, max: 1500 },
    },
    threats: [
      'Climate change',
      'Sea ice loss',
      'Ocean noise pollution (from shipping and seismic testing)',
      'Shipping traffic',
    ],
  },
  {
    id: '31',
    name: 'Sperm Whale',
    scientificName: 'Physeter macrocephalus',
    description:
      'The Sperm Whale is the largest of the toothed whales and the largest toothed predator on Earth. It has the biggest brain of any animal and was the star of the novel "Moby Dick".',
    image:
      'https://images.unsplash.com/photo-1568430328012-21ed450453ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U3Blcm0lMjBXaGFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'All deep, ice-free oceans. Females and young stay in tropical/subtropical waters, while mature males range to polar regions.',
    diet: 'Primarily giant squid and colossal squid, which they hunt in the deep ocean. They also eat octopus and large fish.',
    ecology:
      'Sperm Whales are a major predator of deep-sea squid. They are also famous for their role in nutrient cycling, as their iron-rich feces help fertilize surface phytoplankton.',
    behavior:
      'Sperm Whales are the deepest-diving mammals, capable of reaching 3,000 meters (10,000 feet) and holding their breath for 90 minutes. They live in social, matrilineal groups, and communicate using "codas"—series of clicks—that are unique to each pod.',
    interestingFact:
      'Sperm Whales have a massive, block-shaped head (one-third of their body) containing a unique organ called the "spermaceti," a waxy substance that may help with buoyancy and echolocation.',
    funFacts: [
      'They produce "ambergris," a valuable substance used in perfumes.',
      'They sleep vertically, drifting just below the surface in "logging" behavior.',
      'Their "clicks" are one of the loudest sounds in the animal kingdom.',
    ],
    optimalConditions: {
      temperature: { min: 4, max: 30 },
      salinity: { min: 32, max: 38 },
      depth: { min: 200, max: 3000 },
    },
    threats: [
      'Vessel strikes',
      'Entanglement in fishing gear',
      'Ocean noise pollution',
      'Plastic ingestion',
      'Historical whaling',
    ],
  },
  {
    id: '32',
    name: 'Jellyfish (Moon)',
    scientificName: 'Aurelia aurita',
    description:
      'A common jellyfish recognized by its four, distinct, horseshoe-shaped gonads (reproductive organs) visible through the top of its translucent, saucer-like bell.',
    image:
      'https://plus.unsplash.com/premium_photo-1664297976774-5e8d96cc3c1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SmVsbHlmaXNoJTIwKE1vb24pfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Temperate and tropical waters worldwide, especially in coastal zones, estuaries, and harbors. They are often found in large "blooms".',
    diet: 'Small plankton, including mollusks, crustaceans, and copepods, which they trap on their bell and tentacles with a layer of mucus. They have only a mild, harmless sting.',
    ecology:
      'Jellyfish are an important food source for species like Leatherback Sea Turtles and ocean sunfish. Their blooms can impact fish populations by competing for food or preying on fish larvae.',
    behavior:
      'Moon Jellies drift with the current, but they can move by rhythmically pulsating their bell. They have a complex life cycle, alternating between a free-swimming "medusa" (the adult jelly) and a bottom-dwelling "polyp" stage.',
    interestingFact:
      'Jellyfish have no brain, heart, or bones. They are over 95% water.',
    funFacts: [
      'They are one of the oldest animal groups, existing for over 500 million years.',
      'Some jellyfish are "immortal" (like Turritopsis dohrnii), able to revert to their polyp stage.',
      'A group of jellyfish is called a "bloom" or a "smack".',
    ],
    optimalConditions: {
      temperature: { min: 9, max: 31 },
      salinity: { min: 10, max: 35 },
      depth: { min: 0, max: 100 },
    },
    threats: [
      'Pollution',
      'Climate change (can lead to blooms)',
      'Overfishing (of their predators)',
    ],
  },
  {
    id: '33',
    name: 'Dugong',
    scientificName: 'Dugong dugon',
    description:
      'A large, herbivorous marine mammal, also known as the "sea cow." They are closely related to manatees but are distinguished by their fluked, dolphin-like tail and different snout shape.',
    image:
      'https://images.unsplash.com/photo-1514854560434-dac06a4c6701?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RHVnb25nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Warm, shallow coastal waters where seagrass beds are abundant, from East Africa to Australia and the Red Sea. They are the only strictly marine herbivorous mammal.',
    diet: 'Exclusively seagrass. They "graze" on the seafloor, using their bristly snouts to uproot the plants, leaving distinct "feeding trails" behind.',
    ecology:
      'Dugongs are "sea-farmers." Their grazing is essential for maintaining healthy seagrass meadows, as it promotes new growth and maintains species diversity within the meadows.',
    behavior:
      'Dugongs are slow and placid, spending most of their time grazing. They are semi-social, sometimes seen in large herds of hundreds, but are more often found alone or in pairs (mother and calf).',
    interestingFact:
      'Dugongs are believed to be the inspiration for the ancient "mermaid" legends of sailors.',
    funFacts: [
      'They are more closely related to elephants than to whales or dolphins.',
      'Dugongs can live for over 70 years.',
      'They have poor eyesight but excellent hearing and a sensitive snout.',
    ],
    optimalConditions: {
      temperature: { min: 20, max: 30 },
      salinity: { min: 25, max: 37 },
      depth: { min: 1, max: 10 },
    },
    threats: [
      'Habitat degradation',
      'Seagrass loss',
      'Vessel strikes',
      'Entanglement in fishing gear',
      'Pollution',
      'Poaching',
    ],
  },
  {
    id: '34',
    name: 'Vampire Squid',
    scientificName: 'Vampyroteuthis infernalis',
    description:
      'The "Vampire Squid from Hell" is a small, unique cephalopod that lives in the deep ocean. It is not a true squid or octopus, but in its own special order. It uses bioluminescent "fireworks" to defend itself.',
    image:
      'https://plus.unsplash.com/premium_photo-1661895326043-927c425035a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VmFtcGlyZSUyMFNxdWlkfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Deep sea, in the "oxygen minimum zone" (OMZ) from 600 to 900 meters, where oxygen is too low for most predators. Found in temperate and tropical oceans worldwide.',
    diet: 'Detritus, or "marine snow" (dead plankton, fecal pellets, and mucus), which it catches using two long, sticky, retractable filaments (not tentacles).',
    ecology:
      'The Vampire Squid is a master of energy efficiency, perfectly adapted to a low-food, low-oxygen environment where few other animals can survive.',
    behavior:
      'When threatened, it does not squirt ink (which is useless in the dark). Instead, it pulls its webbed arms over its head to form a "pineapple" shape, and ejects a cloud of glowing, bioluminescent mucus to startle the predator.',
    interestingFact:
      'The Vampire Squid has the largest eyes relative to its body size of any animal in the world.',
    funFacts: [
      'It is a "living fossil" and the last surviving member of its order.',
      'It does not hunt live prey; it is a "detritivore," or marine "composter".',
      'Its light-producing organs are called "photophores".',
    ],
    optimalConditions: {
      temperature: { min: 2, max: 6 },
      salinity: { min: 34, max: 35 },
      depth: { min: 600, max: 1200 },
    },
    threats: [
      'Deep-sea trawling',
      'Ocean acidification',
      'Climate change (which could alter the OMZ)',
    ],
  },
  {
    id: '35',
    name: 'Anglerfish (Deep Sea)',
    scientificName: 'Lophiiformes',
    description:
      'A bony fish named for its characteristic mode of predation: a fleshy, bioluminescent lure (esca) that extends from its head like a "fishing rod" to attract prey in the dark.',
    image:
      'https://plus.unsplash.com/premium_photo-1723449272951-3f5555467729?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QW5nbGVyZmlzaCUyMChEZWVwJTIwU2VhKXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Data Deficient',
    habitat:
      'The bathyal and abyssal zones of the deep sea, thousands of meters below the surface, in total darkness and under immense pressure.',
    diet: 'Carnivorous. Eats fish and crustaceans that are attracted to its glowing lure. It has a massive mouth and a distensible stomach, allowing it to eat prey larger than itself.',
    ecology:
      'As one of the top predators in the deep-sea "midnight zone," the Anglerfish is a key part of this extreme, low-energy ecosystem.',
    behavior:
      'The Anglerfish has one of the strangest reproductive strategies. The tiny, parasitic male, upon finding a large female, bites her and fuses his circulatory system with hers, becoming a permanent "sperm bank" for the rest of his life.',
    interestingFact:
      'The glowing lure is not from the fish itself, but from symbiotic, bioluminescent bacteria that live inside the lure.',
    funFacts: [
      'Only the female Anglerfish has the lure and is large; the male is tiny and parasitic.',
      'Some females can have multiple males attached to them.',
      'Their "fishing rod" is a modified dorsal fin spine.',
    ],
    optimalConditions: {
      temperature: { min: 2, max: 5 },
      salinity: { min: 34, max: 35 },
      depth: { min: 1000, max: 4000 },
    },
    threats: ['Deep-sea trawling', 'Climate change', 'Ocean acidification'],
  },
  {
    id: '36',
    name: 'Spiny Dogfish',
    scientificName: 'Squalus acanthias',
    description:
      'A common species of small shark, notable for the sharp, venomous spines in front of its two dorsal fins. They are often found in large schools.',
    image:
      'https://images.unsplash.com/photo-1701602423122-a72d7489d31d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U3BpbnklMjBEb2dmaXNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Temperate and subarctic waters worldwide, from shallow coastal areas to the continental shelf. They are often found near the bottom.',
    diet: 'Carnivorous. Feeds on smaller fish (like cod and herring), squid, crabs, and jellyfish. They are opportunistic, schooling hunters.',
    ecology:
      'As an abundant mid-level predator, the Spiny Dogfish helps regulate populations of smaller fish and invertebrates.',
    behavior:
      'Spiny Dogfish are known for having one of the longest gestation periods of any vertebrate—up to 24 months (two years)! They give birth to live, fully-formed "pups".',
    interestingFact:
      'The "dogfish" name comes from their habit of hunting in large, pack-like schools.',
    funFacts: [
      'They are one of the most studied sharks in the world.',
      'They are often used in "fish and chips" in Europe, where they are called "rock salmon".',
      'The spines are used for defense and can inflict a painful, venomous wound.',
    ],
    optimalConditions: {
      temperature: { min: 6, max: 15 },
      salinity: { min: 30, max: 36 },
      depth: { min: 10, max: 900 },
    },
    threats: [
      'Overfishing (their long gestation makes them very vulnerable)',
      'Bycatch',
      'Slow reproduction rate',
    ],
  },
  {
    id: '37',
    name: 'Sea Anemone',
    scientificName: 'Actiniaria',
    description:
      'Predatory, polyp-like animals that attach to the seafloor with an adhesive "foot." They are "flower animals" (Anthozoa) with a crown of stinging tentacles (cnidocytes).',
    image:
      'https://images.unsplash.com/photo-1569304374951-de3d34f108c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2VhJTIwQW5lbW9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Data Deficient',
    habitat:
      'All oceans, from shallow tidal pools to deep trenches. Most common on coral reefs and coastal rocks, where they wait for prey to drift by.',
    diet: 'Small fish, shrimp, and plankton that blunder into their tentacles. The tentacles fire stinging "harpoons" (nematocysts) to paralyze the prey, which is then moved to the central mouth.',
    ecology:
      'Anemones provide a critical micro-habitat. They are famous for their symbiotic relationship with clownfish and certain shrimp, which are immune to their sting and gain protection.',
    behavior:
      'Anemones are sessile (fixed) but can slowly "walk" on their foot or detach and drift to a new location if conditions are bad. They can engage in "wars" with other anemones for territory, using special stinging tentacles.',
    interestingFact:
      'A Sea Anemone is essentially just a stomach with a mouth, and that mouth also functions as its anus.',
    funFacts: [
      'They are closely related to corals and jellyfish.',
      'Some anemones can live for 50 years or more.',
      'They can reproduce both sexually (by releasing eggs) and asexually (by splitting in half).',
    ],
    optimalConditions: {
      temperature: { min: 10, max: 28 },
      salinity: { min: 30, max: 37 },
      depth: { min: 0, max: 10000 },
    },
    threats: [
      'Climate change',
      'Ocean acidification',
      'Pollution',
      'Collection for aquariums',
      'Coral bleaching (losing symbiotic algae)',
    ],
  },
  {
    id: '38',
    name: 'Common Starfish',
    scientificName: 'Asterias rubens',
    description:
      'A well-known echinoderm (spiny-skinned animal) with five arms (or "rays") and a central disc. They have a bumpy, spiny surface and are not fish at all.',
    image:
      'https://plus.unsplash.com/premium_photo-1722895862343-8b75c2925e29?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632',
    conservationStatus: 'Least Concern',
    habitat:
      'Seabeds in all oceans, from intertidal zones down to abyssal depths. They prefer rocky, sandy, or gravelly bottoms.',
    diet: 'Carnivorous. Preys on bivalves like mussels, clams, and oysters. It uses its hundreds of tiny, hydraulic "tube feet" to pry open the shell just a crack, then everts its own stomach into the shell to digest the animal in place.',
    ecology:
      'Starfish are a keystone predator in many intertidal zones, controlling mussel populations and thus allowing other species to thrive on the rocks.',
    behavior:
      'Starfish move using their water vascular system, which pumps water into their tube feet to create suction and pull them along. They can regenerate lost limbs, and in some cases, a whole new starfish can grow from a single severed arm.',
    interestingFact:
      'Starfish have no blood; they use seawater in their "water vascular system" to transport nutrients and oxygen.',
    funFacts: [
      'They have an "eyespot" at the tip of each arm, which can sense light and dark.',
      'They have two stomachs: one to eat, and one to "evert" (push out) for digesting prey externally.',
      'They are related to sea urchins, sand dollars, and sea cucumbers.',
    ],
    optimalConditions: {
      temperature: { min: 6, max: 20 },
      salinity: { min: 28, max: 36 },
      depth: { min: 0, max: 600 },
    },
    threats: [
      'Sea star wasting disease (a devastating plague)',
      'Pollution',
      'Habitat degradation',
      'Climate change',
    ],
  },
  {
    id: '39',
    name: 'Sea Urchin (Purple)',
    scientificName: 'Strongylocentrotus purpuratus',
    description:
      'A small, spiny, globular animal. They are "keystone grazers" that can decimate kelp forests if their populations are not controlled by predators.',
    image:
      'https://images.unsplash.com/photo-1657162013469-6b28d9376c95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2VhJTIwVXJjaGluJTIwKFB1cnBsZSl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Rocky intertidal and subtidal zones of the Eastern Pacific, from Alaska to Mexico. They live on the rocky seafloor, often in crevices.',
    diet: 'Herbivorous. Primarily grazes on kelp and other algae. They "mow down" kelp by severing its holdfast at the base, which can destroy entire kelp forests.',
    ecology:
      'Sea Urchins have a "boom-or-bust" ecological role. In a balanced system, sea otters and other predators keep them in check. If predators are removed, urchin populations explode, creating "urchin barrens" devoid of kelp.',
    behavior:
      'Sea Urchins move using their tube feet (like starfish) and by pivoting their movable spines. Their mouth, located on the underside, is a complex, five-toothed structure called "Aristotle\'s lantern," which they use to scrape algae off rocks.',
    interestingFact:
      'Sea Urchins can live for an incredibly long time. The Red Sea Urchin is one of the longest-living animals on Earth, with a lifespan of over 200 years.',
    funFacts: [
      'They are covered in sharp, movable spines for defense and movement.',
      'Their roe (eggs) is considered a delicacy in many cultures, known as "uni" in sushi.',
      'They are closely related to starfish and sand dollars.',
    ],
    optimalConditions: {
      temperature: { min: 8, max: 20 },
      salinity: { min: 31, max: 35 },
      depth: { min: 0, max: 100 },
    },
    threats: [
      'Climate change',
      'Ocean acidification (makes it hard to build their shells)',
      'Disease',
      'Lack of predators (like sea otters)',
    ],
  },
  {
    id: '40',
    name: 'Lionfish',
    scientificName: 'Pterois volitans',
    description:
      'A venomous fish native to the Indo-Pacific, now a highly successful invasive species in the Atlantic. It is known for its ornate, fan-like fins and red, white, and brown stripes.',
    image:
      'https://images.unsplash.com/photo-1564498199868-dd64aeeb69d7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGlvbmZpc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Coral reefs, rocky outcrops, and estuaries. In their native range, they are in balance. As an invasive species in the Atlantic and Caribbean, they have no natural predators and are devastating local reefs.',
    diet: 'Carnivorous. A voracious, "gape-reliant" predator that corners and swallows small fish and crustaceans whole. They can eat fish up to two-thirds their own size.',
    ecology:
      'In the Atlantic, Lionfish are an ecological disaster. They reproduce rapidly, out-compete native fish, and decimate juvenile reef fish populations (like grouper and snapper), disrupting the entire food web.',
    behavior:
      'Lionfish use their large, fan-like pectoral fins to "herd" or corner their prey before striking. Their dorsal spines are highly venomous and used purely for defense.',
    interestingFact:
      'Humans are the only effective predator of Lionfish in the Atlantic. "Eat \'em to beat \'em" campaigns encourage spearfishing and consumption to control their populations.',
    funFacts: [
      'A single female Lionfish can release up to 2 million eggs per year.',
      'Their venom is not deadly to humans but causes extreme pain, swelling, and nausea.',
      'Once cooked, they are perfectly safe and delicious to eat.',
    ],
    optimalConditions: {
      temperature: { min: 22, max: 28 },
      salinity: { min: 30, max: 37 },
      depth: { min: 1, max: 300 },
    },
    threats: ['Invasive species (in Atlantic)', 'Culling efforts', 'Pollution'],
  },
  {
    id: '41',
    name: 'Mahi-mahi',
    scientificName: 'Coryphaena hippurus',
    description:
      'A surface-dwelling, ray-finned fish known for its dazzling, iridescent colors (gold, blue, green) and fast swimming speed. Also known as dolphinfish or dorado.',
    image:
      'https://images.unsplash.com/photo-1674419365397-3ff4f5ef1897?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWFoaS1tYWhpfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Temperate, subtropical, and tropical waters worldwide. They are highly migratory and often found near floating objects like sargassum weed, buoys, and floating debris.',
    diet: 'Carnivorous. A top-level predator that feeds on small fish, squid, crustaceans, and zooplankton. They are very fast-growing.',
    ecology:
      'Mahi-mahi are a key link in the pelagic food web, preying on smaller organisms and serving as a food source for larger predators like sharks and billfish.',
    behavior:
      'They are one of the fastest-growing fish in the ocean, and they are prolific breeders. They are highly social, and are often found in schools.',
    interestingFact:
      'A Mahi-mahi\'s brilliant colors "flash" and become even more vibrant when it is excited or feeding. The colors fade almost immediately upon death.',
    funFacts: [
      'This fish has no relation to the mammal "dolphin". The name "dolphinfish" comes from its "dolphin-like" (blunt) forehead.',
      'Males (bulls) have a very high, flat forehead, while females (cows) have a rounded head.',
      'They can swim at speeds over 50 mph (80 km/h).',
    ],
    optimalConditions: {
      temperature: { min: 21, max: 30 },
      salinity: { min: 30, max: 37 },
      depth: { min: 0, max: 85 },
    },
    threats: ['Overfishing', 'Bycatch', 'Plastic pollution'],
  },
  {
    id: '42',
    name: 'Hammerhead Shark (Great)',
    scientificName: 'Sphyrna mokarran',
    description:
      'The largest species of hammerhead shark, instantly recognizable by its distinctive "hammer" shaped head (cephalofoil) and tall, sickle-shaped dorsal fin.',
    image:
      'https://images.unsplash.com/photo-1728343070447-cadb4a688646?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    conservationStatus: 'Critically Endangered',
    habitat:
      'Warm temperate and tropical waters worldwide, from shallow coastal zones and estuaries to the open ocean.',
    diet: 'Carnivorous. Their preferred prey is stingrays, which they find buried in the sand and pin with their hammer. They also eat other sharks, fish, squid, and crustaceans.',
    ecology:
      'As an apex predator, the Great Hammerhead regulates populations of their prey, especially stingrays. Their decline has had cascading effects on other species.',
    behavior:
      'The "hammer" head is a multi-purpose tool. It provides a 360-degree field of vision, and it is covered in "Ampullae of Lorenzini" (electro-receptors), which it sweeps over the seafloor to find the electrical signals of stingrays hidden in the sand.',
    interestingFact:
      'Hammerhead sharks are one of the few shark species that "tan," or darken, when exposed to sunlight.',
    funFacts: [
      'They are highly vulnerable to overfishing due to their slow reproduction rate.',
      'They are nomadic, solitary hunters.',
      'They are one of the few sharks that practice cannibalism, eating their own young.',
    ],
    optimalConditions: {
      temperature: { min: 20, max: 30 },
      salinity: { min: 32, max: 37 },
      depth: { min: 1, max: 300 },
    },
    threats: [
      'Overfishing (especially for their large fins for shark fin soup)',
      'Bycatch',
      'Slow reproduction rate',
      'Habitat degradation',
    ],
  },
  {
    id: '43',
    name: 'Giant Squid',
    scientificName: 'Architeuthis dux',
    description:
      'An elusive, deep-sea dwelling squid, one of the largest invertebrates on Earth. It is a legendary creature, long thought to be a myth, and is the real-life "Kraken".',
    image:
      'https://plus.unsplash.com/premium_photo-1723449272912-adee3a8317d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2lhbnQlMjBTcXVpZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      "All the world's oceans, at depths of 300 to 1000 meters, in the \"twilight zone\" of the deep sea.",
    diet: 'Deep-sea fish and other squid, which it catches with its two long, toothed-sucker feeding tentacles. It is preyed upon by sperm whales, their only known predator.',
    ecology:
      'The Giant Squid is a top predator in the deep-sea ecosystem. The "battles" between Sperm Whales and Giant Squid are a major ecological interaction in the deep ocean.',
    behavior:
      'Almost nothing is known about their behavior in the wild, as they have almost never been seen alive. The first-ever footage of a live Giant Squid in its natural habitat was captured in 2012.',
    interestingFact:
      'The Giant Squid has the largest eyes of any animal in the animal kingdom—as big as a dinner plate. This allows them to see in the dark and spot the bioluminescent outlines of prey or predators.',
    funFacts: [
      'They can grow to be 43 feet (13 meters) long.',
      'They have a "beak" like a parrot, but it is hidden in the center of their tentacles.',
      'They have ammonium ions in their bodies, which makes them lighter than seawater and helps them float.',
    ],
    optimalConditions: {
      temperature: { min: 2, max: 10 },
      salinity: { min: 34, max: 36 },
      depth: { min: 300, max: 1000 },
    },
    threats: [
      'Deep-sea trawling',
      'Climate change',
      'Ocean noise pollution',
      'Pollution',
    ],
  },
  {
    id: '44',
    name: 'Oarfish (Giant)',
    scientificName: 'Regalecus glesne',
    description:
      "The world's longest bony fish, the Oarfish is a ribbon-like creature that can reach lengths of up to 11 meters (36 feet). It is rarely seen, and its appearance is thought to be the source of \"sea serpent\" legends.",
    image:
      'https://plus.unsplash.com/premium_photo-1723449272951-3f5555467729?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T2FyZmlzaCUyMChHaWFudCl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Pelagic (open ocean), found in deep waters (bathypelagic zone) in all temperate to tropical oceans. They are only seen when they are sick or dying and wash ashore.',
    diet: 'Plankton, small crustaceans, and squid, which it filters from the water. It has no teeth and feeds by filtering water through its "gill rakers".',
    ecology:
      'Very little is known about its ecological role due to its rarity and deep-water habitat. It is presumed to be prey for large, deep-diving sharks.',
    behavior:
      'Oarfish are thought to swim vertically in the water column, with their head up and tail down. They have a long, red, plume-like dorsal fin that starts on their head.',
    interestingFact:
      'In Japan, the Oarfish is known as the "Messenger from the Sea God\'s Palace," and its appearance on a beach is sometimes considered an omen of a coming earthquake.',
    funFacts: [
      'They can "self-amputate" the end of their tail, and many large specimens are missing a portion of their body.',
      'They do not have scales; they have a "tuberculated" skin.',
      'They are not strong swimmers and simply drift with the currents.',
    ],
    optimalConditions: {
      temperature: { min: 4, max: 15 },
      salinity: { min: 33, max: 36 },
      depth: { min: 200, max: 1000 },
    },
    threats: [
      'Deep-sea trawling',
      'Pollution',
      'Lack of data',
      'Plastic ingestion',
    ],
  },
  {
    id: '45',
    name: 'Ganges River Dolphin',
    scientificName: 'Platanista gangetica',
    description:
      'A species of freshwater dolphin found in the Ganges-Brahmaputra-Meghna river systems of India, Nepal, and Bangladesh. It is one of the world\'s few "river dolphins".',
    image:
      'https://images.unsplash.com/photo-1738529078737-8d26ef17f22b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2FuZ2VzJTIwUml2ZXIlMjBEb2xwaGlufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Endangered',
    habitat:
      'Freshwater river systems. They prefer deep water with eddy counter-currents, often found at the confluence of rivers.',
    diet: 'Fish, shrimp, and other small aquatic life. It is effectively blind, navigating and hunting entirely by using sophisticated echolocation (sonar).',
    ecology:
      "As the apex predator of its river ecosystem, the Ganges River Dolphin is a key indicator of the river's health. Its presence signifies a healthy, functioning freshwater system.",
    behavior:
      'These dolphins are solitary and do not form large groups. They are unique in that they often swim on their sides, trailing a flipper along the river bottom.',
    interestingFact:
      'The Ganges River Dolphin is effectively blind. Its eyes lack a lens, and it can only sense the direction of light. It "sees" its world through sound.',
    funFacts: [
      'It is the National Aquatic Animal of India.',
      'They are locally known as "Susu" (or "soons"), which refers to the "sneeze-like" sound they make when they breathe.',
      'They never stop swimming, as they must constantly echolocate.',
    ],
    optimalConditions: {
      temperature: { min: 8, max: 33 },
      salinity: { min: 0, max: 5 },
      depth: { min: 2, max: 15 },
    },
    threats: [
      'Pollution (chemical and noise)',
      'Dam construction (which fragments their habitat)',
      'Entanglement in fishing gear',
      'Poaching',
      'Vessel traffic',
    ],
  },
  {
    id: '46',
    name: 'Vaquita',
    scientificName: 'Phocoena sinus',
    description:
      "The Vaquita is the world's most endangered marine mammal, teetering on the brink of extinction. It is a small, shy porpoise endemic to a tiny area in the northern Gulf of California.",
    image:
      'https://media.istockphoto.com/id/475713608/photo/insect.jpg?s=1024x1024&w=is&k=20&c=AJSdyR0X932mrdXGCv_3SuBQTaLQT2cai7WoA8-a0s0=',
    conservationStatus: 'Critically Endangered',
    habitat:
      'Shallow, turbid waters in the northern Gulf of California, Mexico. This is the only place in the world they are found.',
    diet: 'Small fish, squid, and crustaceans, which they find using echolocation in their murky habitat.',
    ecology:
      'The Vaquita is a small, non-obtrusive predator. Its imminent extinction is a tragic example of how human activities (in this case, illegal fishing) can wipe out an entire species.',
    behavior:
      'Vaquitas are shy and elusive, and are rarely seen. They are usually found alone or in pairs. They are the smallest of all cetaceans (whales, dolphins, and porpoises).',
    interestingFact:
      'The Vaquita\'s greatest threat is not direct; it is "bycatch." They are drowned in "gillnets" (vertical fishing nets) that are set illegally to catch a large, endangered fish called the Totoaba.',
    funFacts: [
      'There are estimated to be fewer than 10 Vaquitas left in the world.',
      'They are the only porpoise species that lives in warm, tropical waters.',
      'They are recognizable by the dark rings around their eyes and lips.',
    ],
    optimalConditions: {
      temperature: { min: 14, max: 36 },
      salinity: { min: 30, max: 35 },
      depth: { min: 0, max: 50 },
    },
    threats: [
      'Bycatch (in illegal gillnets for totoaba)',
      'Habitat degradation',
      'Small population size',
      'Inebriation',
    ],
  },
  {
    id: '47',
    name: 'Flying Fish',
    scientificName: 'Exocoetidae',
    description:
      'A family of fish known for their remarkable ability to "fly" or glide long distances over the water. They use this ability to escape predators.',
    image:
      'https://plus.unsplash.com/premium_photo-1664298454861-ec74363d4b0e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Rmx5aW5nJTIwRmlzaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Surface waters of all warm, tropical, and subtropical oceans. They are a pelagic species.',
    diet: 'Plankton, small crustaceans, and other small marine life near the surface.',
    ecology:
      'Flying Fish are a vital food source for many large ocean predators, including tuna, mahi-mahi, billfish, and dolphins. Their "flying" is a key survival mechanism.',
    behavior:
      'To "fly," the fish swims rapidly towards the surface, breaks through, and spreads its large, wing-like pectoral fins. It propels itself by beating its tail (which remains in the water) back and forth, like an outboard motor, before gliding.',
    interestingFact:
      'A Flying Fish doesn\'t truly "fly" like a bird; it "glides." It can, however, stay airborne for over 650 feet (200 meters) and reach heights of 20 feet.',
    funFacts: [
      'Some species have four "wings" (large pectoral and pelvic fins).',
      'They can glide at speeds over 35 mph (56 km/h).',
      'Their eggs are sometimes attached to floating debris.',
    ],
    optimalConditions: {
      temperature: { min: 20, max: 29 },
      salinity: { min: 32, max: 37 },
      depth: { min: 0, max: 20 },
    },
    threats: ['Overfishing', 'Bycatch', 'Plastic pollution', 'Climate change'],
  },
  {
    id: '48',
    name: "Portuguese Man o' War",
    scientificName: 'Physalia physalis',
    description:
      'This is not a single jellyfish. The Man o\' War is a "siphonophore"—a complex colony of individual, specialized organisms (zooids) that are all attached to each other and function as one.',
    image:
      'https://images.unsplash.com/photo-1725457968327-e67564b0ce0c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9ydHVndWVzZSUyME1hbiUyMG8lNUMnJTIwV2FyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Surface of tropical and subtropical oceans, moved by wind and ocean currents. The "float" (pneumatophore) acts as a sail.',
    diet: 'Small fish and crustaceans, which are paralyzed by its long, stinging tentacles. The tentacles can be up to 100 feet (30 meters) long.',
    ecology:
      "The Man o' War is a dangerous predator of small fish. It is, in turn, eaten by species that are immune to its sting, like the Loggerhead Sea Turtle and the Ocean Sunfish.",
    behavior:
      'The colony is made of four types of polyps: the float, the feeding polyps (gastrozooids), the defensive/prey-capture polyps (dactylozooids - the tentacles), and the reproductive polyps (gonozooids).',
    interestingFact:
      "The Man o' War's sting is powerful and extremely painful to humans, and can remain venomous for days or weeks after the animal has washed ashore.",
    funFacts: [
      'It is named after an 18th-century "man-of-war" sailing ship, which it resembles.',
      'The float is filled with carbon monoxide and nitrogen.',
      "Some fish, like the Man o' War fish, are immune to the sting and live within the tentacles for protection.",
    ],
    optimalConditions: {
      temperature: { min: 18, max: 30 },
      salinity: { min: 33, max: 37 },
      depth: { min: 0, max: 1 },
    },
    threats: ['Plastic pollution', 'Climate change', 'Human encounters'],
  },
  {
    id: '49',
    name: 'Steller Sea Cow',
    scientificName: 'Hydrodamalis gigas',
    description:
      'An extinct species of massive, herbivorous marine mammal, related to the manatee and dugong. It was hunted to extinction by humans just 27 years after its discovery in 1741.',
    image:
      'https://images.unsplash.com/photo-1622229738941-f00ef5427e49?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFN0ZWxsZXIlMjBTZWElMjBDb3d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Critically Endangered', // Note: This is a proxy, as "Extinct" is not in the list.
    habitat:
      'Shallow coastal waters and kelp forests around the Commander Islands in the Bering Sea. It was the only large, cold-water sirenian.',
    diet: 'Exclusively kelp. It was a "grazer" of the giant kelp forests in the region.',
    ecology:
      'The Steller Sea Cow was the primary large herbivore of the Bering Sea kelp forests. Its extinction is a classic, tragic example of "serial overkill" by humans.',
    behavior:
      'According to Georg Steller (the naturalist who discovered it), the sea cow was slow-moving, placid, and very social. It was "tame" and curious, which made it easy to hunt.',
    interestingFact:
      'The Steller Sea Cow was enormous, reaching lengths of 30 feet (9 meters) and weighing up to 10 tons—as big as a small bus.',
    funFacts: [
      'It was hunted to extinction for its meat, fat, and hide by sailors, seal hunters, and fur traders.',
      'It was the last surviving species of a "clade" of giant sea cows.',
      'Its story is a powerful lesson in conservation and the impact of human greed.',
    ],
    optimalConditions: {
      temperature: { min: 2, max: 10 },
      salinity: { min: 30, max: 35 },
      depth: { min: 1, max: 5 },
    },
    threats: ['Overhunting (by humans, led to extinction)'],
  },
  {
    id: '50',
    name: 'Sea Krait (Banded)',
    scientificName: 'Laticauda colubrina',
    description:
      'A highly venomous sea snake, but it is "amphibious." It hunts in the water but must return to land to rest, digest, shed its skin, and breed.',
    image:
      'https://images.unsplash.com/photo-1584269660814-d7b1246612f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2VhJTIwS3JhaXQlMjAoQmFuZGVkKXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Least Concern',
    habitat:
      'Shallow coral reefs and mangrove swamps in the tropical Indo-Pacific. They are often found on small, remote islands.',
    diet: 'Primarily eels, which it hunts by probing reef crevices with its small head. Its venom is a potent neurotoxin.',
    ecology:
      'Sea Kraits are a specialized predator of reef eels, helping to control their populations. They are, in turn, prey for large birds (like eagles) when they are on land.',
    behavior:
      'Banded Sea Kraits are "procoagulants," meaning their venom helps them digest their prey. They have a "paddle-like" tail for swimming but "ventral scales" (like a land snake) to help them climb on rocks and land.',
    interestingFact:
      'Despite having venom 10 times more potent than a rattlesnake, the Banded Sea Krait is extremely docile and rarely bites humans unless severely threatened.',
    funFacts: [
      'They must drink fresh water, which they find on land.',
      'Males are often smaller than females and are known to "swarm" a female during mating season.',
      'They can absorb some oxygen through their skin, allowing for longer dives.',
    ],
    optimalConditions: {
      temperature: { min: 25, max: 30 },
      salinity: { min: 30, max: 36 },
      depth: { min: 0, max: 30 },
    },
    threats: [
      'Habitat degradation (of reefs and nesting sites)',
      'Pollution',
      'Human persecution',
      'Climate change',
    ],
  },
  {
    id: '51',
    name: 'Atlantic Cod',
    scientificName: 'Gadus morhua',
    description:
      'A benthopelagic (bottom-dwelling) fish that has been a vital commercial species for over a thousand years. Its fishery was once one of the most abundant in the world, but collapsed due to overfishing.',
    image:
      'https://images.unsplash.com/photo-1546397751-3f32bcdc25c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXRsYW50aWMlMjBDb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    conservationStatus: 'Vulnerable',
    habitat:
      'Cold, deep waters of the North Atlantic, from the continental shelf to deeper basins. They prefer rocky or gravelly bottoms.',
    diet: 'Carnivorous. Feeds on other fish (like herring and capelin) and invertebrates (like crabs, shrimp, and lobster).',
    ecology:
      'Cod are a "top-down" predator, historically controlling many smaller fish and invertebrate populations. Their collapse has had profound, cascading effects on the entire North Atlantic ecosystem.',
    behavior:
      'Cod are a "demersal" (bottom-feeding) fish. They are known to make long seasonal migrations to their spawning grounds, such as the Grand Banks of Newfoundland.',
    interestingFact:
      'The collapse of the Newfoundland Cod fishery in 1992 is one of the most famous and devastating examples of overfishing in human history, putting 30,000 people out of work.',
    funFacts: [
      'A single large female cod can produce 9 million eggs.',
      'They have a "chin barbel," a whisker-like-organ on their chin, which they use to find food on the seafloor.',
      'Cod "talk" to each other using grunts and thumps, especially during spawning.',
    ],
    optimalConditions: {
      temperature: { min: 0, max: 12 },
      salinity: { min: 30, max: 35 },
      depth: { min: 50, max: 600 },
    },
    threats: [
      'Overfishing',
      'Climate change (warming waters)',
      'Habitat degradation (from bottom trawling)',
      'Bycatch',
    ],
  },
  {
    id: '52',
    name: 'Blobfish',
    scientificName: 'Psychrolutes marcidus',
    description:
      'A deep-sea fish that became famous for its gelatinous, "sad" appearance when brought to the surface. In its natural, high-pressure habitat, it looks like a normal fish.',
    image:
      'https://plus.unsplash.com/premium_photo-1708433274329-d1bce90656a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1166',
    conservationStatus: 'Data Deficient',
    habitat:
      'Deep waters off the coasts of mainland Australia and Tasmania, at depths of 600 to 1,200 meters, where the pressure is 60-120 times greater than at the surface.',
    diet: 'Scavenger. As a very slow-moving fish, it eats "marine snow"—crustaceans, mollusks, and other organic matter—that drifts by on the sea floor.',
    ecology:
      'The Blobfish is a perfectly adapted deep-sea survivor. Its gelatinous, "jelly-like" flesh is slightly less dense than water, allowing it to float effortlessly above the seafloor without expending energy.',
    behavior:
      'It is a sit-and-wait predator, conserving energy in its low-food environment. It simply opens its mouth and "inhales" whatever edible matter floats by.',
    interestingFact:
      'The Blobfish was voted the "World\'s Ugliest Animal" in 2013, but this is only because its body "melts" and deforms when it is brought up from the extreme pressure of the deep sea.',
    funFacts: [
      'It has no real skeleton and very little muscle.',
      'The "sad" photo of a blobfish ("Mr. Blobby") is of a dead, decompressed specimen.',
      'In its own habitat, it is a highly successful and well-adapted animal.',
    ],
    optimalConditions: {
      temperature: { min: 2, max: 5 },
      salinity: { min: 34, max: 35 },
      depth: { min: 600, max: 1200 },
    },
    threats: ['Deep-sea trawling (bycatch)', 'Habitat destruction'],
  },
];

/**
 * A collection of predefined responses for the chatbot.
 */
export const chatbotResponses = {
  greeting:
    "Hello! I'm your OceanIQ AI Assistant. I can help you with marine species information, habitat predictions, ocean data analysis, and conservation topics. What would you like to know?",

  /**
   * Generates a generic response for a species query.
   * The Chatbot component itself is responsible for finding the species in `marineSpeciesData`.
   */
  speciesInfo: (speciesName: string): string => {
    return `Ah, ${speciesName}! A fascinating species. You can find detailed information, including their habitat, diet, and conservation status, in our Marine Encyclopedia. I can also answer specific questions you have about them.`;
  },

  oceanHealth:
    'Ocean health is under significant stress from climate change, leading to warmer waters and acidification, as well as pollution and overfishing. Our Dashboard page shows real-time data on these parameters for several key regions.',

  default:
    "I'm not sure I understand. Could you rephrase that? I can help with questions about marine species, ocean health, conservation, and our app's features like the Dashboard and Species Predictor.",
};

// Minimal Encyclopedia component so the app can import and render it.
export const Encyclopedia: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Marine Encyclopedia</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marineSpeciesData.map((s) => (
            <article
              key={s.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="text-sm text-gray-600">{s.scientificName}</p>
                <p className="mt-2 text-sm text-gray-700">{s.description}</p>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Habitat:</strong> {s.habitat}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <strong>Diet:</strong> {s.diet}
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {s.conservationStatus}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};