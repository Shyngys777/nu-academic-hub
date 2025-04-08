
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { SendHorizontal, X, ChevronRight, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Predefined responses for the chatbot
const botResponses: Record<string, string> = {
  "hello": "Hello! How can I help you today with NU Academic Hub?",
  "hi": "Hi there! I'm your NU Academic Hub assistant. What would you like to know?",
  "help": "I can help you navigate the NU Academic Hub. You can ask about features like exam schedules, study planner, or academic materials.",
  "features": "NU Academic Hub offers several features including: exam schedule tracking, study planner, academic materials library, and personalized academic recommendations.",
  "exams": "The Exams feature allows you to view upcoming exams, track your exam schedule, and access exam preparation materials.",
  "study": "The Study Planner helps you organize your study sessions, create study goals, and track your progress.",
  "materials": "Our Materials section contains lecture notes, textbooks, past exams, and other academic resources for your courses.",
  "dashboard": "The Dashboard gives you an overview of your academic progress, upcoming exams, and study plans.",
  "contact": "You can contact the NU Academic Hub support team at support@nu-academichub.edu.kz",
  "bye": "Goodbye! Feel free to chat with me anytime you need assistance with NU Academic Hub.",
  "default": "I'm still learning about NU Academic Hub. Could you try asking something else, or phrase your question differently?"
};

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your NU Academic Hub assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Generate bot response after a small delay
    setTimeout(() => {
      const botMessage = generateResponse(inputValue.toLowerCase());
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: botMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }, 600);
  };

  const generateResponse = (input: string): string => {
    // Check if the input matches any of our predefined responses
    for (const [key, response] of Object.entries(botResponses)) {
      if (input.includes(key.toLowerCase())) {
        return response;
      }
    }
    
    // Return default response if no match is found
    return botResponses.default;
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-nu-blue shadow-lg hover:bg-nu-darkblue"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-full max-w-md h-[500px] bg-white rounded-lg shadow-xl z-40 overflow-hidden flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-nu-blue p-4 text-white flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                <h3 className="font-medium">NU Academic Hub Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-nu-blue/80 h-8 w-8 p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "mb-4 max-w-[80%]",
                    message.sender === 'user' 
                      ? "ml-auto" 
                      : "mr-auto"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      message.sender === 'user'
                        ? "bg-nu-blue text-white rounded-br-none"
                        : "bg-white text-gray-800 shadow-sm rounded-bl-none"
                    )}
                  >
                    <p>{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-nu-blue"
                />
                <Button
                  onClick={handleSendMessage}
                  className="rounded-l-none bg-nu-blue hover:bg-nu-darkblue"
                >
                  <SendHorizontal className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Ask about exams, study planner, materials, or dashboard features.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotAssistant;
