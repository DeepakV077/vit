import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react';
import { chatbotResponses, marineSpeciesData } from '../utils/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: chatbotResponses.greeting,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for species-specific queries
    for (const species of marineSpeciesData) {
      if (lowerMessage.includes(species.name.toLowerCase())) {
        return chatbotResponses.speciesInfo(species.name);
      }
    }

    // Check for habitat/region queries
    if (lowerMessage.includes('habitat') || lowerMessage.includes('near') || lowerMessage.includes('coast')) {
      return "To check species habitability for a specific region, please use the 'Species Predict' page where you can enter environmental parameters like temperature, salinity, and depth. I can then provide detailed predictions for Coral, Tuna, and Mangroves.";
    }

    // Check for ocean health queries
    if (lowerMessage.includes('ocean') && (lowerMessage.includes('health') || lowerMessage.includes('status'))) {
      return chatbotResponses.oceanHealth;
    }

    // Check for prediction queries
    if (lowerMessage.includes('predict') || lowerMessage.includes('suitability')) {
      return "I can help predict species suitability! Navigate to the 'Species Predict' page and enter environmental parameters such as temperature (15-35°C), salinity (0-40 PSU), depth (0-1000m), and density (1020-1030 kg/m³). The AI will analyze these conditions and provide suitability scores for Coral, Tuna, and Mangroves.";
    }

    // Check for conservation queries
    if (lowerMessage.includes('conservation') || lowerMessage.includes('protect') || lowerMessage.includes('threat')) {
      return "Marine conservation is critical. Major threats include climate change, ocean acidification, overfishing, pollution, and habitat destruction. You can help by supporting marine protected areas, choosing sustainable seafood, reducing plastic use, and supporting conservation organizations. Check our Encyclopedia for specific threats to each species.";
    }

    // Check for data/dashboard queries
    if (lowerMessage.includes('data') || lowerMessage.includes('dashboard') || lowerMessage.includes('statistics')) {
      return "The Dashboard page shows real-time ocean environmental data including temperature trends, salinity levels, and species diversity across different regions. You can select from 5 ocean regions including Chennai Coast, Kanyakumari, Pondicherry, Bali, and Florida Keys to view detailed analytics.";
    }

    // Check for map queries
    if (lowerMessage.includes('map') || lowerMessage.includes('location') || lowerMessage.includes('region')) {
      return "The Map View provides an interactive visualization of ocean regions with color-coded temperature overlays. Click on any marker to see detailed environmental parameters and AI-powered species predictions for that location.";
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm your OceanIQ AI Assistant. I can help you with marine species information, habitat predictions, ocean data analysis, and conservation topics. What would you like to know?";
    }

    // Thank you responses
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Feel free to ask me anything about marine ecosystems, species, or ocean data. I'm here to help!";
    }

    // Default response
    return chatbotResponses.default;
  };

  const sendToGemini = async (prompt: string) => {
    try {
      const resp = await fetch('/make-server-86c3a706/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => null);
        throw new Error(err?.error || `Server returned ${resp.status}`);
      }

      const data = await resp.json();
      return data?.reply || null;
    } catch (err) {
      console.error('Gemini request failed:', err);
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

  setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Try Gemini proxy when enabled; otherwise use the local generator
    let response: string | null = null;
    if (useGemini) {
      response = await sendToGemini(userMessage.content);
    }

    if (!response) {
      // Fallback to the built-in generator
      response = generateResponse(userMessage.content);
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

  setMessages((prev: Message[]) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Tell me about coral reefs",
    "What threatens bluefin tuna?",
    "How do I predict species habitability?",
    "Show me ocean health status",
    "What are mangrove forests?"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl text-gray-900">AI Assistant</h1>
          </div>
          <p className="text-gray-600">Ask questions about marine ecosystems, species, and ocean data</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Suggested Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg text-gray-900">Suggested Questions</h3>
              </div>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 transition-colors text-sm text-gray-700 hover:text-indigo-700"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <h4 className="text-sm text-indigo-900 mb-2">What I can help with:</h4>
                <ul className="text-xs text-indigo-800 space-y-1">
                  <li>• Marine species information</li>
                  <li>• Habitat predictions</li>
                  <li>• Conservation topics</li>
                  <li>• Ocean data analysis</li>
                  <li>• Environmental parameters</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <Card className="lg:col-span-3 flex flex-col h-[calc(100vh-16rem)]">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-blue-600'
                        : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`flex-1 max-w-2xl ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={
                          message.role === 'user'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }
                      >
                        {message.role === 'user' ? 'You' : 'OceanIQ AI'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      className={`inline-block p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about marine ecosystems..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
