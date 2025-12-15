import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, Trash2, MessageCircle, Bot, User, ChevronRight, Copy, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatPageProps {
  onBack: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI health assistant. I can help you understand symptoms, provide health information, and guide you through wellness questions. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return "Fever can be a sign of various conditions. If your temperature is above 100.4°F (38°C), it's important to stay hydrated, rest, and monitor your symptoms. If fever persists for more than 3 days or is accompanied by severe symptoms, please consult a healthcare provider.";
    }
    
    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
      return "Headaches can have many causes including stress, dehydration, lack of sleep, or underlying conditions. Try resting in a quiet, dark room, staying hydrated, and applying a cold or warm compress. If headaches are severe, frequent, or accompanied by other concerning symptoms, please seek medical attention.";
    }
    
    if (lowerMessage.includes('cough') || lowerMessage.includes('coughing')) {
      return "Coughs can be dry or productive and may indicate respiratory issues. Stay hydrated, use a humidifier, and avoid irritants. If the cough persists for more than 2 weeks, produces blood, or is accompanied by fever and difficulty breathing, please consult a healthcare provider.";
    }
    
    if (lowerMessage.includes('stomach') || lowerMessage.includes('nausea') || lowerMessage.includes('digestive')) {
      return "Digestive issues can be caused by various factors including diet, stress, or infections. Try eating bland foods, staying hydrated, and avoiding spicy or fatty foods. If symptoms persist or worsen, or if you experience severe pain, please seek medical attention.";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm here to help with any health-related questions you might have. Remember, while I can provide general information, it's always best to consult with a healthcare professional for personalized medical advice.";
    }
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      return "⚠️ If you're experiencing a medical emergency, please call your local emergency services immediately (911 in the US). For urgent but non-emergency situations, contact your healthcare provider or visit an urgent care center.";
    }
    
    // Default responses
    const defaultResponses = [
      "I understand your concern. Can you provide more specific details about your symptoms, such as when they started and their severity?",
      "That's a valid health question. While I can provide general information, I'd recommend discussing this with a healthcare professional for personalized advice.",
      "Thank you for sharing that information. Based on what you've described, here are some general considerations, but please consult a medical professional for proper evaluation.",
      "I'm here to help with health-related questions. Could you tell me more about what you're experiencing so I can provide better guidance?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(userMessage.content),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to delete this conversation? This action cannot be undone.')) {
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: "Hello! I'm your AI health assistant. I can help you understand symptoms, provide health information, and guide you through wellness questions. How can I assist you today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  const handleDownloadChat = () => {
    const chatContent = messages.map(msg => {
      const time = msg.timestamp.toLocaleString();
      const sender = msg.type === 'user' ? 'You' : 'AI Assistant';
      return `[${time}] ${sender}: ${msg.content}`;
    }).join('\n\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Health Chat Assistant</h1>
                <p className="text-gray-600">Ask questions about your health and symptoms</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleDownloadChat}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                title="Download chat history"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button
                onClick={handleClearChat}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                title="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Messages Area */}
          <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                }`}>
                  {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`inline-block p-3 rounded-2xl relative group ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <button
                      onClick={() => copyMessage(message.content)}
                      className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
                        message.type === 'user' 
                          ? 'hover:bg-blue-700 text-blue-200' 
                          : 'hover:bg-gray-200 text-gray-600'
                      }`}
                      title="Copy message"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3">
                  <div className="flex space-x-1">
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
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your symptoms or health concerns..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={isTyping}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • This is for informational purposes only
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-800 mb-1">Medical Disclaimer</h3>
              <p className="text-amber-700 text-xs">
                This AI assistant provides general health information only and should not replace professional medical advice. 
                Always consult with a healthcare provider for proper diagnosis and treatment. In emergencies, call your local emergency services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};