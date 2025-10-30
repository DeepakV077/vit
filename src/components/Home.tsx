import { ImageWithFallback } from './Fallback/ImageWithFallback';
import { Button } from './ui/button';
import { Waves, Brain, Map, LineChart, Shield, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: LineChart,
      title: 'Data Analytics',
      description: 'Analyze ocean environmental parameters including temperature, salinity, depth, and density in real-time.'
    },
    {
      icon: Brain,
      title: 'AI Predictions',
      description: 'Predict marine species habitability using advanced machine learning algorithms trained on extensive datasets.'
    },
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Visualize ocean data with color-coded overlays showing temperature, salinity, and biodiversity hotspots.'
    },
    {
      icon: Shield,
      title: 'Species Encyclopedia',
      description: 'Access comprehensive information about marine species including habitat, diet, threats, and conservation status.'
    },
    {
      icon: Zap,
      title: 'AI Chatbot',
      description: 'Get instant answers about marine ecosystems and species from our intelligent AI assistant.'
    },
    {
      icon: Waves,
      title: 'Export Reports',
      description: 'Generate and download detailed reports with analytics, charts, and AI insights in PDF or CSV format.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1686816189172-451cdc8e7bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwYmx1ZXxlbnwxfHx8fDE3NjE2Mzg2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Ocean waves"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <Waves className="w-12 h-12 text-cyan-300" />
              <h1 className="text-6xl">OceanIQ</h1>
            </div>
            <h2 className="text-3xl text-cyan-100 mb-6">
              AI-Powered Marine Intelligence & Biodiversity Prediction Platform
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Understand, predict, and protect marine ecosystems using advanced AI, real-time data analytics, 
              and interactive visualizations. Make data-driven decisions for ocean conservation.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => onNavigate('dashboard')}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6"
              >
                Explore Dashboard
              </Button>
              <Button
                onClick={() => onNavigate('predict')}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6"
              >
                Predict Species
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-text-gray-900 mb-4">Platform Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools for marine research, education, and conservation efforts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl mb-2">3</div>
              <div className="text-cyan-200">Marine Species Tracked</div>
            </div>
            <div>
              <div className="text-4xl mb-2">5</div>
              <div className="text-cyan-200">Ocean Regions</div>
            </div>
            <div>
              <div className="text-4xl mb-2">4</div>
              <div className="text-cyan-200">Environmental Parameters</div>
            </div>
            <div>
              <div className="text-4xl mb-2">AI</div>
              <div className="text-cyan-200">Powered Predictions</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl text-gray-900 mb-4">Ready to Explore?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Start analyzing marine ecosystems and predicting species habitability with AI-powered insights
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => onNavigate('map')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6"
          >
            View Map
          </Button>
          <Button
            onClick={() => onNavigate('chatbot')}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6"
          >
            Ask AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
}
