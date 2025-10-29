import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Thermometer, Droplets, Anchor, Activity } from 'lucide-react';
import { oceanRegions, temperatureData, speciesDiversityData } from '../utils/mockData';

export function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState(oceanRegions[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">Marine Data Dashboard</h1>
          <p className="text-gray-600">Real-time ocean environmental parameters and analytics</p>
        </div>

        {/* Region Selector */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">Select Ocean Region</label>
          <Select
            value={selectedRegion.region}
            onValueChange={(value) => {
              const region = oceanRegions.find(r => r.region === value);
              if (region) setSelectedRegion(region);
            }}
          >
            <SelectTrigger className="w-full md:w-96">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {oceanRegions.map((region) => (
                <SelectItem key={region.region} value={region.region}>
                  {region.region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Temperature</p>
                <p className="text-3xl text-gray-900">{selectedRegion.temperature}°C</p>
                <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">Normal</Badge>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Salinity</p>
                <p className="text-3xl text-gray-900">{selectedRegion.salinity} PSU</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">Optimal</Badge>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Depth</p>
                <p className="text-3xl text-gray-900">{selectedRegion.depth}m</p>
                <Badge className="mt-2 bg-cyan-100 text-cyan-800 border-cyan-200">Shallow</Badge>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Anchor className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Density</p>
                <p className="text-3xl text-gray-900">{selectedRegion.density}</p>
                <p className="text-xs text-gray-500 mt-1">kg/m³</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Temperature & Salinity Trend */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Annual Temperature & Salinity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temp"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Temperature (°C)"
                  dot={{ fill: '#f59e0b', r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="salinity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Salinity (PSU)"
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Species Diversity by Region */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Species Suitability Index by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={speciesDiversityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="region" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="coral" fill="#ec4899" name="Coral" />
                <Bar dataKey="tuna" fill="#3b82f6" name="Tuna" />
                <Bar dataKey="mangrove" fill="#10b981" name="Mangrove" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Radar Chart - Environmental Parameters */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">Environmental Parameter Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={[
              { parameter: 'Temperature', value: (selectedRegion.temperature / 35) * 100, fullMark: 100 },
              { parameter: 'Salinity', value: (selectedRegion.salinity / 40) * 100, fullMark: 100 },
              { parameter: 'Depth', value: Math.min((selectedRegion.depth / 100) * 100, 100), fullMark: 100 },
              { parameter: 'Density', value: ((selectedRegion.density - 1020) / 10) * 100, fullMark: 100 },
              { parameter: 'Biodiversity', value: 75, fullMark: 100 }
            ]}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="parameter" stroke="#6b7280" />
              <PolarRadiusAxis stroke="#6b7280" />
              <Radar
                name="Current Values"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Region Info */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg text-gray-900 mb-4">Current Region Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Region Name</p>
              <p className="text-gray-900">{selectedRegion.region}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Coordinates</p>
              <p className="text-gray-900">
                {selectedRegion.latitude.toFixed(4)}°N, {selectedRegion.longitude.toFixed(4)}°E
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-gray-900">
                {new Date(selectedRegion.timestamp).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Data Quality</p>
              <Badge className="bg-green-100 text-green-800 border-green-200">High Quality</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
