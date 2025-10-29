import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, BookOpen, AlertTriangle, ThermometerSun, Droplets, Anchor } from 'lucide-react';
import { marineSpeciesData } from '../utils/mockData';

export function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState(marineSpeciesData[0]);

  const filteredSpecies = marineSpeciesData.filter(species =>
    species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    species.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl text-gray-900">Marine Encyclopedia</h1>
          </div>
          <p className="text-gray-600">Comprehensive information about marine species and ecosystems</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search species by name or scientific name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Species List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm text-gray-600 mb-3">Species ({filteredSpecies.length})</h3>
            {filteredSpecies.map((species) => (
              <Card
                key={species.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedSpecies.id === species.id
                    ? 'ring-2 ring-green-500 bg-green-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSpecies(species)}
              >
                <h4 className="text-gray-900 mb-1">{species.name}</h4>
                <p className="text-sm text-gray-600 italic">{species.scientificName}</p>
                <Badge className="mt-2 text-xs" variant="outline">
                  {species.conservationStatus}
                </Badge>
              </Card>
            ))}
          </div>

          {/* Species Details */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              {/* Hero Image */}
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={selectedSpecies.image}
                  alt={selectedSpecies.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-3xl text-gray-900 mb-1">{selectedSpecies.name}</h2>
                      <p className="text-xl text-gray-600 italic">{selectedSpecies.scientificName}</p>
                    </div>
                    <Badge
                      className={`${
                        selectedSpecies.conservationStatus.includes('Endangered')
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : selectedSpecies.conservationStatus.includes('Vulnerable')
                          ? 'bg-orange-100 text-orange-800 border-orange-200'
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}
                    >
                      {selectedSpecies.conservationStatus}
                    </Badge>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{selectedSpecies.description}</p>
                </div>

                {/* Tabs for Details */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="conditions">Optimal Conditions</TabsTrigger>
                    <TabsTrigger value="threats">Threats</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6 mt-6">
                    <div>
                      <h4 className="text-lg text-gray-900 mb-3">Habitat</h4>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedSpecies.habitat}</p>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-900 mb-3">Diet</h4>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedSpecies.diet}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="conditions" className="mt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <ThermometerSun className="w-5 h-5 text-orange-600" />
                          </div>
                          <h5 className="text-gray-900">Temperature</h5>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Minimum</span>
                            <span className="text-gray-900">{selectedSpecies.optimalConditions.temperature.min}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Maximum</span>
                            <span className="text-gray-900">{selectedSpecies.optimalConditions.temperature.max}°C</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-blue-600" />
                          </div>
                          <h5 className="text-gray-900">Salinity</h5>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Minimum</span>
                            <span className="text-gray-900">{selectedSpecies.optimalConditions.salinity.min} PSU</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Maximum</span>
                            <span className="text-gray-900">{selectedSpecies.optimalConditions.salinity.max} PSU</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                            <Anchor className="w-5 h-5 text-cyan-600" />
                          </div>
                          <h5 className="text-gray-900">Depth</h5>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Minimum</span>
                            <span className="text-gray-900">{selectedSpecies.optimalConditions.depth.min}m</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Maximum</span>
                            <span className="text-gray-900">{selectedSpecies.optimalConditions.depth.max}m</span>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <Card className="mt-6 p-5 bg-blue-50 border-blue-100">
                      <p className="text-sm text-blue-900">
                        <strong>Note:</strong> These are optimal conditions for the species to thrive. 
                        Survival may be possible outside these ranges, but with increased stress and lower fitness.
                      </p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="threats" className="mt-6">
                    <div className="space-y-4">
                      {selectedSpecies.threats.map((threat, index) => (
                        <Card key={index} className="p-5">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                            <div>
                              <h5 className="text-gray-900 mb-2">{threat}</h5>
                              <p className="text-sm text-gray-600">
                                {threat === 'Ocean acidification' && 'Caused by increased CO2 absorption, leading to lower pH levels that affect shell and skeleton formation.'}
                                {threat === 'Coral bleaching' && 'Rising ocean temperatures cause coral to expel symbiotic algae, leading to whitening and potential death.'}
                                {threat === 'Pollution' && 'Chemical pollutants, plastics, and runoff damage marine habitats and harm species directly.'}
                                {threat === 'Overfishing' && 'Excessive fishing pressure reduces population sizes below sustainable levels.'}
                                {threat === 'Climate change' && 'Changing temperatures and weather patterns disrupt habitats and species behavior.'}
                                {threat === 'Bycatch' && 'Unintentional capture in fishing gear targeting other species.'}
                                {threat === 'Habitat degradation' && 'Destruction or alteration of natural habitats through human activities.'}
                                {threat === 'Coastal development' && 'Construction and urbanization of coastal areas destroys natural habitats.'}
                                {threat === 'Aquaculture' && 'Fish farming can introduce diseases, pollutants, and invasive species.'}
                                {threat === 'Sea level rise' && 'Rising sea levels can inundate coastal habitats and change salinity levels.'}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <Card className="mt-6 p-5 bg-green-50 border-green-100">
                      <h5 className="text-green-900 mb-2">Conservation Actions</h5>
                      <p className="text-sm text-green-800">
                        Protecting {selectedSpecies.name} requires coordinated efforts including marine protected areas, 
                        sustainable fishing practices, pollution reduction, and climate change mitigation. Support conservation 
                        organizations and make sustainable seafood choices to help protect marine biodiversity.
                      </p>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
