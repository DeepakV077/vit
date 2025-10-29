import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Info, Waves, Thermometer } from 'lucide-react';
import { oceanRegions, predictSpeciesSuitability } from '../utils/mockData';

export function MapView() {
  const [selectedLocation, setSelectedLocation] = useState(oceanRegions[0]);
  const predictions = predictSpeciesSuitability(selectedLocation);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">Interactive Ocean Map</h1>
          <p className="text-gray-600">Explore marine regions and analyze environmental data</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <Card className="lg:col-span-2 p-6">
            <div className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-50 rounded-lg h-[600px] overflow-hidden">
              {/* Simulated Map with Markers */}
              <svg className="w-full h-full" viewBox="0 0 800 600">
                {/* Water background */}
                <defs>
                  <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.3 }} />
                  </linearGradient>
                </defs>
                <rect width="800" height="600" fill="url(#oceanGradient)" />
                
                {/* Grid lines */}
                {[...Array(10)].map((_, i) => (
                  <g key={`grid-${i}`}>
                    <line
                      x1={i * 80}
                      y1="0"
                      x2={i * 80}
                      y2="600"
                      stroke="#94a3b8"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                    <line
                      x1="0"
                      y1={i * 60}
                      x2="800"
                      y2={i * 60}
                      stroke="#94a3b8"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  </g>
                ))}

                {/* Location Markers */}
                {oceanRegions.map((region, index) => {
                  // Convert lat/long to approximate x/y positions for visualization
                  const x = ((region.longitude + 180) / 360) * 800;
                  const y = ((90 - region.latitude) / 180) * 600;
                  const isSelected = selectedLocation.region === region.region;
                  
                  return (
                    <g
                      key={region.region}
                      onClick={() => setSelectedLocation(region)}
                      className="cursor-pointer"
                    >
                      {/* Temperature heat map circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 50 : 40}
                        fill={
                          region.temperature > 28 ? '#f59e0b' :
                          region.temperature > 26 ? '#10b981' :
                          '#3b82f6'
                        }
                        opacity="0.2"
                      />
                      
                      {/* Marker */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 12 : 8}
                        fill={isSelected ? '#dc2626' : '#3b82f6'}
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      
                      {/* Label */}
                      <text
                        x={x}
                        y={y + 25}
                        textAnchor="middle"
                        fill="#1e293b"
                        fontSize={isSelected ? '14' : '12'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {region.region.split(',')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <p className="text-sm text-gray-900 mb-2">Temperature Scale</p>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                    <span className="text-gray-700">&lt;26°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <span className="text-gray-700">26-28°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded bg-orange-500"></div>
                    <span className="text-gray-700">&gt;28°C</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Location Details Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-red-600" />
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">{selectedLocation.region}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedLocation.latitude.toFixed(2)}°, {selectedLocation.longitude.toFixed(2)}°
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Temperature</span>
                  <span className="text-gray-900">{selectedLocation.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Salinity</span>
                  <span className="text-gray-900">{selectedLocation.salinity} PSU</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Depth</span>
                  <span className="text-gray-900">{selectedLocation.depth}m</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Density</span>
                  <span className="text-gray-900">{selectedLocation.density} kg/m³</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Waves className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg text-gray-900">Species Predictions</h3>
              </div>
              
              <div className="space-y-3">
                {predictions.map((pred) => (
                  <div key={pred.species} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900">{pred.species}</span>
                      <Badge
                        className={
                          pred.riskIndex === 'Low'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : pred.riskIndex === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }
                      >
                        {pred.riskIndex} Risk
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            pred.suitabilityScore >= 75
                              ? 'bg-green-500'
                              : pred.suitabilityScore >= 50
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${pred.suitabilityScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{pred.suitabilityScore}%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{pred.reasoning}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-100">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900">
                    Click on any marker to view detailed environmental data and AI-powered species predictions for that region.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
