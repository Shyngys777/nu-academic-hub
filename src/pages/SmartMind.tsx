
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Brain, FileUp, Mic, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SmartMind = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{type: "user" | "ai", content: string}[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user message to chat
    const userMessage = { type: "user" as const, content: question };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setQuestion("");
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to HuggingFace
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            type: "ai", 
            content: `Here's information related to your question about "${question}". The AI response would contain helpful educational content and study tips tailored to your question.`
          }
        ]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      toast.error("Failed to get a response. Please try again.");
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto max-w-5xl pb-10"
    >
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-nu-blue/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-nu-gold/5 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-nu-blue to-nu-lightblue rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-nu-darkblue">SmartMind AI</h1>
              <p className="text-muted-foreground">Your intelligent study assistant powered by AI</p>
            </div>
          </div>
        </motion.div>

        {/* Messages area */}
        <motion.div 
          variants={itemVariants}
          className="flex-grow overflow-y-auto mb-4 rounded-lg border bg-gray-50/50 p-4"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-nu-blue/10 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-nu-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">What will you discover today?</h3>
              <p className="text-muted-foreground max-w-md">
                Ask a question, drag and drop a file, or choose an option to get started
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
                <Card className="hover:shadow-md transition-all duration-300 border border-gray-200 hover:bg-white/60 cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <ArrowUp className="h-5 w-5 text-gray-600" />
                    </div>
                    <h4 className="font-medium">Write</h4>
                    <p className="text-xs text-muted-foreground">Write and cite with AI</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all duration-300 border border-gray-200 hover:bg-white/60 cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <FileUp className="h-5 w-5 text-gray-600" />
                    </div>
                    <h4 className="font-medium">Import</h4>
                    <p className="text-xs text-muted-foreground">Chat with docs and videos</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all duration-300 border border-gray-200 hover:bg-white/60 cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <Mic className="h-5 w-5 text-gray-600" />
                    </div>
                    <h4 className="font-medium">Record</h4>
                    <p className="text-xs text-muted-foreground">Record and chat with audio</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "p-4 rounded-lg max-w-[85%]",
                    message.type === "user" 
                      ? "bg-nu-blue text-white ml-auto" 
                      : "bg-white border border-gray-200"
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white border border-gray-200 p-4 rounded-lg max-w-[85%] flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-nu-blue" />
                  <span className="text-sm text-gray-500">Generating response...</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Input area */}
        <motion.div variants={itemVariants}>
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              placeholder="Ask Anara a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full resize-none border-gray-300 focus:border-nu-blue pr-24"
              rows={3}
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                disabled={isLoading}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                type="submit" 
                disabled={!question.trim() || isLoading}
                className="bg-nu-blue hover:bg-nu-darkblue"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
              </Button>
            </div>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            SmartMind may display inaccurate info, including about people, so double-check its responses.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SmartMind;
