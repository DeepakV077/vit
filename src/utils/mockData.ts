// Mock data for OceanIQ Marine Intelligence Platform

export interface OceanParameter {
  latitude: number;
  longitude: number;
  temperature: number; // Celsius
  salinity: number; // PSU
  depth: number; // meters
  density: number; // kg/m³
  timestamp: string;
  region: string;
}

export interface SpeciesPrediction {
  species: string;
  suitabilityScore: number; // 0-100
  riskIndex: string; // Low, Medium, High
  reasoning: string;
  confidenceLevel: number;
}

export interface MarineSpecies {
  id: string;
  name: string;
  scientificName: string;
  habitat: string;
  diet: string;
  threats: string[];
  conservationStatus: string;
  description: string;
  image: string;
  optimalConditions: {
    temperature: { min: number; max: number };
    salinity: { min: number; max: number };
    depth: { min: number; max: number };
  };
}

export const oceanRegions: OceanParameter[] = [
  {
    latitude: 13.0827,
    longitude: 80.2707,
    temperature: 28.5,
    salinity: 34.5,
    depth: 45,
    density: 1024.5,
    timestamp: '2025-10-29T10:30:00Z',
    region: 'Chennai Coast, Bay of Bengal'
  },
  {
    latitude: 8.7642,
    longitude: 78.1348,
    temperature: 29.2,
    salinity: 35.1,
    depth: 52,
    density: 1025.2,
    timestamp: '2025-10-29T10:30:00Z',
    region: 'Kanyakumari, Indian Ocean'
  },
  {
    latitude: 11.9416,
    longitude: 79.8083,
    temperature: 27.8,
    salinity: 34.8,
    depth: 38,
    density: 1024.1,
    timestamp: '2025-10-29T10:30:00Z',
    region: 'Pondicherry Coast'
  },
  {
    latitude: -8.3405,
    longitude: 115.0920,
    temperature: 26.5,
    salinity: 34.2,
    depth: 125,
    density: 1023.8,
    timestamp: '2025-10-29T10:30:00Z',
    region: 'Bali, Indonesia'
  },
  {
    latitude: 25.7617,
    longitude: -80.1918,
    temperature: 24.3,
    salinity: 36.0,
    depth: 85,
    density: 1025.8,
    timestamp: '2025-10-29T10:30:00Z',
    region: 'Miami, Florida Keys'
  }
];

export const marineSpeciesData: MarineSpecies[] = [
  {
    id: 'coral',
    name: 'Coral Reefs',
    scientificName: 'Anthozoa',
    habitat: 'Shallow tropical and subtropical ocean waters',
    diet: 'Zooplankton, organic matter through symbiosis with zooxanthellae',
    threats: ['Ocean acidification', 'Coral bleaching', 'Pollution', 'Overfishing', 'Climate change'],
    conservationStatus: 'Vulnerable to Critically Endangered',
    description: 'Coral reefs are diverse underwater ecosystems built by colonies of tiny animals. They support about 25% of all marine species and are often called the "rainforests of the sea."',
    image: 'https://images.unsplash.com/photo-1697826208801-6082a2222a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNvcmFsJTIwcmVlZnxlbnwxfHx8fDE3NjE2MzMxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    optimalConditions: {
      temperature: { min: 23, max: 29 },
      salinity: { min: 32, max: 40 },
      depth: { min: 0, max: 50 }
    }
  },
  {
    id: 'tuna',
    name: 'Bluefin Tuna',
    scientificName: 'Thunnus thynnus',
    habitat: 'Open ocean, pelagic zones',
    diet: 'Fish, squid, crustaceans',
    threats: ['Overfishing', 'Bycatch', 'Climate change', 'Habitat degradation'],
    conservationStatus: 'Endangered',
    description: 'Bluefin tuna are powerful, fast-swimming fish found in Atlantic and Pacific oceans. They are highly prized for sushi and sashimi, leading to severe overfishing.',
    image: 'https://images.unsplash.com/photo-1651323529708-09c3fec4dbd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dW5hJTIwZmlzaCUyMG9jZWFufGVufDF8fHx8MTc2MTY1Mzg5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    optimalConditions: {
      temperature: { min: 15, max: 30 },
      salinity: { min: 34, max: 37 },
      depth: { min: 0, max: 550 }
    }
  },
  {
    id: 'mangrove',
    name: 'Mangrove Forest',
    scientificName: 'Rhizophora',
    habitat: 'Coastal intertidal zones in tropical and subtropical regions',
    diet: 'Photosynthesis, nutrient absorption from sediment',
    threats: ['Coastal development', 'Aquaculture', 'Pollution', 'Climate change', 'Sea level rise'],
    conservationStatus: 'Threatened',
    description: 'Mangroves are salt-tolerant trees that grow in coastal saline waters. They provide critical habitat for many marine species and protect coastlines from erosion and storms.',
    image: 'https://images.unsplash.com/photo-1589556183130-530470785fab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGZvcmVzdHxlbnwxfHx8fDE3NjE3MTEyNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    optimalConditions: {
      temperature: { min: 20, max: 35 },
      salinity: { min: 0, max: 90 },
      depth: { min: 0, max: 5 }
    }
  }
];

export const mockPredictions: Record<string, SpeciesPrediction[]> = {
  'Chennai Coast, Bay of Bengal': [
    {
      species: 'Coral',
      suitabilityScore: 85,
      riskIndex: 'Low',
      reasoning: 'Temperature and salinity are within optimal range for coral growth. Depth is suitable for photosynthetic activity.',
      confidenceLevel: 92
    },
    {
      species: 'Tuna',
      suitabilityScore: 78,
      riskIndex: 'Low',
      reasoning: 'Water temperature is ideal for bluefin tuna. Adequate depth for feeding patterns.',
      confidenceLevel: 88
    },
    {
      species: 'Mangrove',
      suitabilityScore: 72,
      riskIndex: 'Medium',
      reasoning: 'Salinity levels are acceptable. Coastal proximity supports mangrove establishment.',
      confidenceLevel: 85
    }
  ]
};

export const temperatureData = [
  { month: 'Jan', temp: 26.2, salinity: 34.1 },
  { month: 'Feb', temp: 26.8, salinity: 34.3 },
  { month: 'Mar', temp: 27.5, salinity: 34.5 },
  { month: 'Apr', temp: 28.2, salinity: 34.6 },
  { month: 'May', temp: 29.1, salinity: 34.8 },
  { month: 'Jun', temp: 29.5, salinity: 35.0 },
  { month: 'Jul', temp: 28.8, salinity: 34.9 },
  { month: 'Aug', temp: 28.5, salinity: 34.7 },
  { month: 'Sep', temp: 28.0, salinity: 34.6 },
  { month: 'Oct', temp: 27.5, salinity: 34.5 },
  { month: 'Nov', temp: 27.0, salinity: 34.3 },
  { month: 'Dec', temp: 26.5, salinity: 34.2 }
];

export const speciesDiversityData = [
  { region: 'Chennai', coral: 45, tuna: 23, mangrove: 67 },
  { region: 'Kanyakumari', coral: 72, tuna: 34, mangrove: 55 },
  { region: 'Pondicherry', coral: 58, tuna: 28, mangrove: 61 },
  { region: 'Bali', coral: 89, tuna: 41, mangrove: 44 },
  { region: 'Florida Keys', coral: 76, tuna: 52, mangrove: 38 }
];

export function predictSpeciesSuitability(params: OceanParameter): SpeciesPrediction[] {
  const predictions: SpeciesPrediction[] = [];

  marineSpeciesData.forEach(species => {
    const tempInRange = params.temperature >= species.optimalConditions.temperature.min &&
                        params.temperature <= species.optimalConditions.temperature.max;
    const salinityInRange = params.salinity >= species.optimalConditions.salinity.min &&
                           params.salinity <= species.optimalConditions.salinity.max;
    const depthInRange = params.depth >= species.optimalConditions.depth.min &&
                        params.depth <= species.optimalConditions.depth.max;

    let score = 0;
    const factors: string[] = [];

    if (tempInRange) {
      score += 33;
      factors.push('optimal temperature');
    } else {
      const tempDiff = Math.min(
        Math.abs(params.temperature - species.optimalConditions.temperature.min),
        Math.abs(params.temperature - species.optimalConditions.temperature.max)
      );
      score += Math.max(0, 33 - tempDiff * 5);
    }

    if (salinityInRange) {
      score += 33;
      factors.push('suitable salinity');
    } else {
      const salinityDiff = Math.min(
        Math.abs(params.salinity - species.optimalConditions.salinity.min),
        Math.abs(params.salinity - species.optimalConditions.salinity.max)
      );
      score += Math.max(0, 33 - salinityDiff * 3);
    }

    if (depthInRange) {
      score += 34;
      factors.push('appropriate depth');
    } else {
      const depthDiff = Math.min(
        Math.abs(params.depth - species.optimalConditions.depth.min),
        Math.abs(params.depth - species.optimalConditions.depth.max)
      );
      score += Math.max(0, 34 - depthDiff * 0.5);
    }

    let riskIndex: string;
    if (score >= 75) riskIndex = 'Low';
    else if (score >= 50) riskIndex = 'Medium';
    else riskIndex = 'High';

    const reasoning = factors.length > 0
      ? `This region shows ${factors.join(', ')} for ${species.name}. ${
          riskIndex === 'Low' ? 'Conditions are highly favorable for survival.' :
          riskIndex === 'Medium' ? 'Conditions are moderately suitable but monitoring is advised.' :
          'Conditions may be challenging for this species.'
        }`
      : `Environmental conditions are suboptimal for ${species.name}. Multiple parameters are outside ideal range.`;

    predictions.push({
      species: species.name,
      suitabilityScore: Math.round(score),
      riskIndex,
      reasoning,
      confidenceLevel: Math.min(95, Math.round(score + Math.random() * 10))
    });
  });

  return predictions;
}

export const chatbotResponses = {
  greeting: "Hello! I'm OceanIQ Assistant. I can help you understand marine ecosystems, predict species habitability, and explain ocean data. How can I assist you today?",
  speciesInfo: (species: string) => {
    const speciesData = marineSpeciesData.find(s => s.name.toLowerCase().includes(species.toLowerCase()));
    if (speciesData) {
      return `${speciesData.name} (${speciesData.scientificName}): ${speciesData.description} They thrive in ${speciesData.habitat}. Conservation status: ${speciesData.conservationStatus}.`;
    }
    return "I don't have detailed information about that species yet. Please check our Encyclopedia section.";
  },
  oceanHealth: "Ocean health depends on multiple factors including temperature, salinity, pH levels, and biodiversity. Climate change, pollution, and overfishing are major threats to marine ecosystems globally.",
  default: "I'm here to help with marine biology questions, species predictions, and ocean data analysis. Try asking about coral reefs, tuna, or mangroves!"
};
