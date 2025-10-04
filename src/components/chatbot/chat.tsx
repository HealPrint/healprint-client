import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Mic,
  ArrowRight,
  Loader2,
  Plus,
  AlertCircle,
  X,
  User
} from "lucide-react";
import { useChat } from "../../hooks/chat";

// Typewriter effect component
const TypewriterText = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return <span>{displayedText}</span>;
};

interface HomePageProps {
  onNewChat?: () => void;
  onSelectConversation?: (id: string) => void;
}

const HomePage = ({ onNewChat, onSelectConversation }: HomePageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { 
    messages, 
    isLoading, 
    error,
    sendMessage, 
    clearChat, 
    currentConversationId,
    assessmentStage,
    symptomsCollected,
    needsDiagnosis
  } = useChat();
  const resultsEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;

    await sendMessage(searchTerm);
    setSearchQuery("");
    
    // Ensure scroll after sending message
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleInputFocus = () => {
    // When input is focused, ensure current content is visible
    if (hasMessages) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  const handleClearInput = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const hasMessages = messages.length > 0;
  
  // Prevent unnecessary re-renders when conversation ID changes but messages are the same
  const prevConversationId = useRef(currentConversationId);
  useEffect(() => {
    if (prevConversationId.current !== currentConversationId) {
      prevConversationId.current = currentConversationId;
    }
  }, [currentConversationId]);

  // Auto-scroll to keep current content visible above input
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Scroll to the very bottom of the container
      container.scrollTop = container.scrollHeight;
    }
  };

  // Enhanced auto-scroll that ensures content stays visible
  useEffect(() => {
    if (hasMessages) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [messages, isLoading, hasMessages]);

  // Scroll when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length]);

  // Scroll when loading state changes
  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  // Auto-focus input on component mount and when messages change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasMessages]);

  // Scroll to bottom when messages change (including when loading a conversation)
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages]);

  // Keep input focused after search
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Mobile Header - Fixed at top */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="flex items-center justify-between px-4 py-3 h-14">
          <div className="flex items-center space-x-2">
            <img src="/assets/Remifi_logo_wbl8fg.png" alt="HealPrint" className="h-6 w-auto" />
            <span className="font-semibold text-gray-900">HealPrint</span>
          </div>
          <Button
            onClick={onNewChat}
            size="sm"
            className="bg-[#2F4F5F] hover:bg-[#1e3a47] text-white px-3 py-1.5 rounded-md text-sm"
          >
            New Chat
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pt-14 lg:pt-0">
        {/* Welcome Screen */}
        {!hasMessages && (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="text-4xl font-bold text-[#2F4F5F] mb-2">HealPrint</div>
                <p className="text-lg text-gray-600">Your AI health companion</p>
              </div>
              
              {/* Search Input */}
              <div className="w-full max-w-2xl mx-auto">
                <div className="relative rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-[#2F4F5F] transition-all duration-200 bg-white">
                  <div className="flex items-center px-6 py-4">
                    <Search className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Describe your skin or hair concerns..."
                      className="flex-1 text-lg bg-transparent border-none outline-none placeholder-gray-500 text-gray-900 font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      autoFocus
                      style={{ fontSize: '16px' }}
                    />
                    <Button
                      onClick={() => handleSearch()}
                      disabled={!searchQuery.trim() || isLoading}
                      className="ml-4 bg-[#2F4F5F] hover:bg-[#1e3a47] text-white px-6 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                      <span>Search</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Get insights on skin & hair health connected to your internal wellness
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {hasMessages && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' 
                          ? 'bg-[#2F4F5F] text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Search className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                    
                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className="prose prose-gray max-w-none">
                        {message.role === 'user' ? (
                          <div className="text-gray-900 font-medium leading-relaxed">
                            {message.content}
                          </div>
                        ) : (
                          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            <TypewriterText text={message.content} speed={3} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading State */}
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                        <Search className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-red-600 text-sm">
                        {error}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={resultsEndRef} />
              </div>
            </div>
          </div>
        )}

        {/* Input Area - Fixed at bottom */}
        {hasMessages && (
          <div className="border-t border-gray-200 bg-white p-4" style={{ paddingBottom: 'env(safe-area-inset-bottom, 1rem)' }}>
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-[#2F4F5F] transition-all duration-200 bg-white">
                <div className="flex items-center px-4 py-3">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Message HealPrint..."
                    className="flex-1 text-base bg-transparent border-none outline-none placeholder-gray-500 text-gray-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    style={{ fontSize: '16px' }}
                  />
                  <Button
                    onClick={() => handleSearch()}
                    disabled={!searchQuery.trim() || isLoading}
                    className="ml-2 bg-[#2F4F5F] hover:bg-[#1e3a47] text-white p-2 rounded-xl transition-colors duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
