import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, X, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const STORAGE_KEY = "oceaniq_qa_v1";

/**
 * Dummy local-only chatbot implementation.
 * No network or API calls — replies are generated locally with simple heuristics
 * and canned responses. Useful for offline demos and testing.
 */
export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! 🌊 I’m OceanIQ — your offline demo AI. I can give canned explanations about marine topics and replay stored Q&A. Try asking about coral bleaching or add your own Q&A.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // no stored Q&A to load (feature removed)
  }, []);

  // stored Q&A feature removed — no persistence or add/remove helpers

  // Local dummy response generator — no APIs used.
  const generateDummyReply = async (prompt: string) => {
    // Simulate thinking/typing delay
    await new Promise((res) => setTimeout(res, 600 + Math.random() * 900));

    const normalized = prompt.toLowerCase();

    // Exact or fuzzy match against stored Q&A
    const best = storedQA.find(
      (q) =>
        q.question.toLowerCase() === normalized ||
        normalized.includes(q.question.toLowerCase()) ||
        q.question.toLowerCase().includes(normalized)
    );
    if (best) {
      return `Stored answer — "${best.answer}"`;
    }

    // Some simple heuristics for common marine topics
    if (normalized.includes("coral")) {
      return [
        "Coral bleaching happens when corals expel the symbiotic algae living in their tissues due to stress (often heat). This leaves the coral white and, if prolonged, can lead to mortality.",
        "Key mitigation: reduce local stressors (pollution, overfishing), protect resilient reefs, and cut greenhouse gas emissions to limit warming."
      ].join("\n\n");
    }

    if (normalized.includes("mangrove")) {
      return "Mangroves are coastal forests that protect shorelines, sequester carbon, and provide nursery habitat. Protecting them involves preventing clearing, restoring tidal flows, and protecting against pollution.";
    }

    if (normalized.includes("overfishing")) {
      return "Overfishing occurs when fish are removed faster than they can reproduce. Solutions include catch limits, protected areas, gear restrictions, and community-based management.";
    }

    if (normalized.includes("temperature") || normalized.includes("trend")) {
      return "Temperature trends generally show warming in many ocean regions over recent decades due to climate change. For demo purposes, visualize historical sea surface temperature increases and seasonal variability.";
    }

    // Generic fallback responses with a helpful tone
    const generic = [
      `Interesting question about: "${prompt}". In this demo, I provide canned explanations. Try asking about coral bleaching, mangroves, or add a stored Q&A for instant replies.`,
      `Here's a short explanation related to "${prompt}": This is a demo response summarizing common knowledge. For live data or model-backed answers, integrate a backend API.`,
      `I don't have a specific entry for "${prompt}", but you can save Q&A in the sidebar and replay them into the chat.`
    ];
    return generic[Math.floor(Math.random() * generic.length)];
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setError(null);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    const aiMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await generateDummyReply(trimmed);
      setMessages((prev) => prev.map((m) => (m.id === aiMsg.id ? { ...m, content: String(reply) } : m)));
    } catch (e) {
      console.error("Dummy reply failed", e);
      setMessages((prev) => prev.map((m) => (m.id === aiMsg.id ? { ...m, content: "⚠️ Unexpected error generating reply." } : m)));
    } finally {
      setIsTyping(false);
    }
  };

  const cancelStreaming = () => {
    // For the dummy bot, just stop the typing indicator.
    setIsTyping(false);
  };

  const quickPrompts = [
    "Explain coral bleaching",
    "How can we protect mangroves?",
    "Show ocean temperature trends",
    "What causes overfishing?",
    "Predict species habitat suitability",
  ];

  // stored Q&A removed

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 py-16">
      <div className="max-w-7xl mx-auto px-8 space-y-10">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="bg-linear-to-tr from-blue-600 to-cyan-500 text-white w-14 h-14 rounded-3xl flex items-center justify-center shadow-xl">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">OceanIQ AI Chatbot (Demo)</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Offline demo — no API calls. Add stored Q&A or use suggested prompts.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6 md:col-span-1">
            <Card className="rounded-xl shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Suggested Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                {quickPrompts.map((q) => (
                  <Button
                    key={q}
                    variant="ghost"
                    className="w-full justify-start h-11 text-left rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800"
                    onClick={() => setInput(q)}
                  >
                    {q}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Stored Q&A removed */}

            <Card className="rounded-xl border bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300 text-base">What I can help with 🌊</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-200 text-sm space-y-1">
                  <li>Marine species information (canned)</li>
                  <li>Replay stored Q&A instantly</li>
                  <li>Demo-friendly explanations</li>
                  <li>No external API required</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <Card className="md:col-span-2 flex flex-col h-[82vh] rounded-xl shadow-2xl overflow-hidden">
            <ScrollArea className="flex-1 p-6 space-y-6 bg-linear-to-b from-white/60 to-transparent dark:from-gray-900/50">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-xl p-4 rounded-2xl shadow-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        <Badge variant="outline" className="text-xs">{msg.role === "user" ? "You" : "OceanIQ (Demo)"}</Badge>
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 dark:bg-gray-800">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex gap-1">
                    <motion.div className="w-2.5 h-2.5 bg-blue-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                    <motion.div className="w-2.5 h-2.5 bg-blue-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} />
                    <motion.div className="w-2.5 h-2.5 bg-blue-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} />
                  </div>
                  <Button variant="ghost" size="sm" onClick={cancelStreaming} className="ml-auto"><X className="w-4 h-4" /></Button>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <div className="flex gap-3 items-center">
                <Input
                  placeholder="Ask me about coral reefs, ocean data..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  disabled={isTyping}
                  className="flex-1 h-12 rounded-lg"
                />
                <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="h-12 px-4 rounded-lg">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
