import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Send, 
  Loader2, 
  Brain,
  User,
  AlertCircle
} from "lucide-react";
import { ChatMessage } from "../../api/openaiService";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  error,
  onSendMessage,
  onBack
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    onSendMessage(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-[800px] bg-gray-50 rounded-none sm:rounded-2xl border-0 sm:border border-gray-200 w-full relative">
      {/* Mobile: ChatGPT-style Top Navbar */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
        {/* Left side - Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="hover:bg-gray-100 p-2 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        {/* Center - HealPrint name with icon */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-semibold text-gray-900 text-base">HealPrint</h1>
        </div>
        
        {/* Right side - Empty space for balance */}
        <div className="w-10"></div>
      </div>

      {/* Desktop: Original Header */}
      <div className="hidden sm:flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white rounded-none sm:rounded-t-2xl">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-gray-100 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#2F4F5F] rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm sm:text-base">HealPrint AI</h2>
              <p className="text-xs text-gray-500 hidden sm:block">Your Health Assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages - Mobile Optimized */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 pb-24 sm:pb-4" style={{ paddingBottom: 'env(safe-area-inset-bottom, 6rem)' }}>
        {messages.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#2F4F5F] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Welcome to HealPrint AI
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              I'm here to help you connect your skin and hair symptoms to internal health insights. 
              Get personalized wellness guidance, safe product recommendations, and expert referrals. How can I assist you today?
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                message.role === 'user'
                  ? 'bg-[#2F4F5F] text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.role === 'assistant' && (
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#2F4F5F] mt-0.5 flex-shrink-0" />
                )}
                {message.role === 'user' && (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base break-words">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#2F4F5F]" />
                <div className="flex items-center space-x-1">
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#2F4F5F]" />
                  <span className="text-gray-600 text-sm sm:text-base">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input - Mobile Optimized */}
      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-none sm:rounded-b-2xl pb-safe">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your skin or hair concerns..."
            className="flex-1 min-h-[44px] sm:min-h-[44px] max-h-32 sm:max-h-32 px-3 sm:px-4 py-3 sm:py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#2F4F5F] focus:border-transparent text-base sm:text-base"
            disabled={isLoading}
            style={{ 
              fontSize: '16px', // Prevents zoom on iOS
              lineHeight: '1.4'
            }}
          />
          <Button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-[#2F4F5F] hover:bg-[#2F4F5F]/90 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl h-auto min-w-[44px] sm:min-w-[48px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;