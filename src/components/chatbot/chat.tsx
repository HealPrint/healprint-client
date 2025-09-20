import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Mic,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useChat } from "../../hooks/chat";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { 
    messages, 
    isLoading, 
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

  const hasMessages = messages.length > 0 || isLoading;

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

  // Keep input focused after search
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-white flex flex-col w-full">
      {/* Initial centered layout - like ChatGPT */}
      {!hasMessages && (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-4xl font-bold text-blue-600">
              HealPrint
            </div>
          </div>
          
          {/* Centered Search Input - Mobile Optimized */}
          <div className="w-full max-w-xl mx-auto px-2 sm:px-0">
            <div className="relative rounded-lg border border-gray-200 shadow-md hover:shadow-sm focus-within:shadow-xl focus-within:border-blue-400 transition-all duration-200 bg-white">
              <div className="flex items-center pl-4 sm:pl-6 pr-1 sm:pr-2 py-4 sm:py-6">
                <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mr-3 sm:mr-4 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Describe your skin or hair concerns..."
                  className="flex-1 text-sm sm:text-base bg-transparent border-none outline-none placeholder-gray-500 text-gray-900 font-medium min-w-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleInputFocus}
                  disabled={isLoading}
                  autoFocus
                />
                <div className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4 flex-shrink-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-8 h-8 sm:w-9 sm:h-9 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    disabled={isLoading}
                  >
                    <Mic className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-8 h-8 sm:w-9 sm:h-9 p-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-sm disabled:opacity-50"
                    onClick={() => handleSearch()}
                    disabled={isLoading || !searchQuery.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Helper Text */}
            <div className="text-center mt-3 sm:mt-4 px-2">
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Get insights on skin & hair health connected to your internal wellness
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section - Mobile Optimized */}
      {hasMessages && (
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-thin smooth-scroll"
          style={{ 
            maxHeight: 'calc(100vh - 200px)',
            paddingBottom: 'env(safe-area-inset-bottom, 6rem)'
          }}
        >
          <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-24 sm:pb-32">
            {/* Messages Container */}
            <div className="space-y-4 sm:space-y-8">
              {messages.map((message, index) => (
                <div key={index} className="w-full">
                  {message.role === 'user' && (
                    <div className="mb-4 sm:mb-6">
                      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 leading-tight break-words">
                        {message.content}
                      </h1>
                      <div className="w-12 h-0.5 bg-blue-600"></div>
                    </div>
                  )}
                  
                  {message.role === 'assistant' && (
                    <div className="w-full">
                      <div className="flex items-start space-x-2 sm:space-x-3 py-3 sm:py-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0 mt-1">
                          {/* Empty space - no icon for completed messages */}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading State */}
              {isLoading && (
                <div className="mb-4 sm:mb-8">
                  <div className="flex items-start space-x-2 sm:space-x-3 py-3 sm:py-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
                        <span>Searching and analyzing...</span>
                      </div>
                      <div className="mt-2 sm:mt-3 space-y-2">
                        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={resultsEndRef} className="h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Floating Input - Mobile Optimized */}
      {hasMessages && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 p-3 sm:p-4 sm:relative sm:border-t-0 sm:bg-transparent sm:px-0">
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-lg border border-gray-200 shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-400 transition-all duration-200 bg-white">
              <div className="flex items-center pl-3 sm:pl-4 lg:pl-6 pr-1 sm:pr-2 py-3 sm:py-4 lg:py-6">
                <Search className="w-4 sm:w-4 lg:w-5 h-4 sm:h-4 lg:h-5 text-gray-400 mr-2 sm:mr-3 lg:mr-4 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me question..."
                  className="flex-1 text-base sm:text-base lg:text-base bg-transparent border-none outline-none placeholder-gray-500 text-gray-900 font-medium min-w-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleInputFocus}
                  disabled={isLoading}
                  autoFocus
                  style={{ 
                    fontSize: '16px', // Prevents zoom on iOS
                    lineHeight: '1.4'
                  }}
                />
                <div className="flex items-center space-x-1 sm:space-x-1 lg:space-x-2 ml-1 sm:ml-2 lg:ml-4 flex-shrink-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    disabled={isLoading}
                  >
                    <Mic className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 p-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-sm disabled:opacity-50"
                    onClick={() => handleSearch()}
                    disabled={isLoading || !searchQuery.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
