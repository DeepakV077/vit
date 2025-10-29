import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Brain, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { predictSpeciesSuitability, type OceanParameter, type SpeciesPrediction } from '../utils/mockData';

export function SpeciesPredict() {
  const [parameters, setParameters] = useState<Partial<OceanParameter>>({
    latitude: 13.0827,
    longitude: 80.2707,
    temperature: 28.5,
    salinity: 34.5,
    depth: 45,
    density: 1024.5,
    region: 'Custom Location'
  });

  const [predictions, setPredictions] = useState<SpeciesPrediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePredict = () => {
    if (!parameters.temperature || !parameters.salinity || !parameters.depth || !parameters.density) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = predictSpeciesSuitability(parameters as OceanParameter);
      setPredictions(results);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl text-gray-900">AI Species Prediction</h1>
          </div>
          <p className="text-gray-600">Predict marine species habitability using environmental parameters</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <Card className="p-6 lg:col-span-1">
            <h3 className="text-lg text-gray-900 mb-4">Environmental Parameters</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  value={parameters.temperature}
                  onChange={(e) => setParameters({ ...parameters, temperature: parseFloat(e.target.value) })}
                  placeholder="e.g., 28.5"
                />
                <p className="text-xs text-gray-500 mt-1">Range: 15-35°C</p>
              </div>

              <div>
                <Label htmlFor="salinity">Salinity (PSU)</Label>
                <Input
                  id="salinity"
                  type="number"
                  step="0.1"
                  value={parameters.salinity}
                  onChange={(e) => setParameters({ ...parameters, salinity: parseFloat(e.target.value) })}
                  placeholder="e.g., 34.5"
                />
                <p className="text-xs text-gray-500 mt-1">Range: 0-40 PSU</p>
              </div>

              <div>
                <Label htmlFor="depth">Depth (meters)</Label>
                <Input
                  id="depth"
                  type="number"
                  value={parameters.depth}
                  onChange={(e) => setParameters({ ...parameters, depth: parseFloat(e.target.value) })}
                  placeholder="e.g., 45"
                />
                <p className="text-xs text-gray-500 mt-1">Range: 0-1000m</p>
              </div>

              <div>
                <Label htmlFor="density">Density (kg/m³)</Label>
                <Input
                  id="density"
                  type="number"
                  step="0.1"
                  value={parameters.density}
                  onChange={(e) => setParameters({ ...parameters, density: parseFloat(e.target.value) })}
                  placeholder="e.g., 1024.5"
                />
                <p className="text-xs text-gray-500 mt-1">Range: 1020-1030 kg/m³</p>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handlePredict}
                  disabled={isAnalyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Predict Species Suitability
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900 mb-2">How it works:</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• AI model analyzes your input parameters</li>
                    <li>• Compares with optimal species conditions</li>
                    <li>• Generates suitability scores (0-100)</li>
                    <li>• Provides risk assessment and reasoning</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {predictions.length === 0 ? (
              <Card className="p-12 text-center">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">No Predictions Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter environmental parameters on the left and click "Predict Species Suitability" to see AI-powered predictions for Coral, Tuna, and Mangroves.
                </p>
              </Card>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-4">
                  {predictions.map((pred) => {
                    const ScoreIcon = pred.suitabilityScore >= 75 ? CheckCircle : 
                                    pred.suitabilityScore >= 50 ? TrendingUp : AlertCircle;
                    
                    return (
                      <Card key={pred.species} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg text-gray-900">{pred.species}</h4>
                          <ScoreIcon
                            className={`w-6 h-6 ${
                              pred.suitabilityScore >= 75
                                ? 'text-green-600'
                                : pred.suitabilityScore >= 50
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          />
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Suitability Score</span>
                            <span className="text-2xl text-gray-900">{pred.suitabilityScore}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                pred.suitabilityScore >= 75
                                  ? 'bg-green-500'
                                  : pred.suitabilityScore >= 50
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${pred.suitabilityScore}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Risk Level</span>
                            <Badge
                              className={
                                pred.riskIndex === 'Low'
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : pred.riskIndex === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                  : 'bg-red-100 text-red-800 border-red-200'
                              }
                            >
                              {pred.riskIndex}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Confidence</span>
                            <span className="text-sm text-gray-900">{pred.confidenceLevel}%</span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Detailed Analysis Cards */}
                {predictions.map((pred) => (
                  <Card key={`detail-${pred.species}`} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg text-gray-900 mb-2">{pred.species} Analysis</h4>
                        <p className="text-gray-600 leading-relaxed">{pred.reasoning}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          pred.suitabilityScore >= 75
                            ? 'border-green-200 text-green-800'
                            : pred.suitabilityScore >= 50
                            ? 'border-yellow-200 text-yellow-800'
                            : 'border-red-200 text-red-800'
                        }
                      >
                        {pred.suitabilityScore >= 75 ? 'Highly Suitable' :
                         pred.suitabilityScore >= 50 ? 'Moderately Suitable' : 'Low Suitability'}
                      </Badge>
                    </div>
                  </Card>
                ))}

                {/* AI Insights */}
                <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100">
                  <div className="flex items-start gap-3">
                    <Brain className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="text-lg text-gray-900 mb-2">AI Insights</h4>
                      <p className="text-gray-700 mb-3">
                        Based on the current environmental parameters, here are the key findings:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">•</span>
                          <span>Temperature at {parameters.temperature}°C is {
                            parameters.temperature! >= 26 && parameters.temperature! <= 29
                              ? 'optimal for most coral species'
                              : 'outside the ideal range for sensitive species'
                          }</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">•</span>
                          <span>Salinity levels at {parameters.salinity} PSU indicate {
                            parameters.salinity! >= 32 && parameters.salinity! <= 37
                              ? 'healthy ocean conditions'
                              : 'non-standard salinity levels'
                          }</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">•</span>
                          <span>Depth of {parameters.depth}m suggests {
                            parameters.depth! < 50
                              ? 'suitable for photosynthetic organisms and shallow reef systems'
                              : 'deeper water conditions better suited for pelagic species'
                          }</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
