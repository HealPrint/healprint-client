import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Mic,
  Camera,
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
          
          {/* Centered Search Input - ChatGPT Style */}
          <div className="w-full max-w-xl mx-auto">
            <div className="relative rounded-lg border border-gray-200 shadow-md hover:shadow-sm focus-within:shadow-xl focus-within:border-blue-400 transition-all duration-200 bg-white">
              <div className="flex items-center pl-6 pr-2 py-6">
                <Search className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Describe your skin or hair concerns..."
                  className="flex-1 text-base bg-transparent border-none outline-none placeholder-gray-500 text-gray-900 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleInputFocus}
                  disabled={isLoading}
                  autoFocus
                />
                <div className="flex items-center space-x-2 ml-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-9 h-9 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    disabled={isLoading}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-9 h-9 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    disabled={isLoading}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-9 h-9 p-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-sm disabled:opacity-50"
                    onClick={() => handleSearch()}
                    disabled={isLoading || !searchQuery.trim()}
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
            
            {/* Helper Text */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Get insights on skin & hair health connected to your internal wellness
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section - True Perplexity Style */}
      {hasMessages && (
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-thin smooth-scroll h-full"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          <div className="max-w-2xl mx-auto px-4 py-8 pb-40">
            {/* Messages Container */}
            <div className="space-y-8">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.role === 'user' && (
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {message.content}
                      </h1>
                      <div className="w-12 h-0.5 bg-blue-600"></div>
                    </div>
                  )}
                  
                  {message.role === 'assistant' && (
                    <div className="prose prose-gray max-w-none">
                      <div className="flex items-start space-x-3 py-4">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                          {/* Empty space - no icon for completed messages */}
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-900 leading-relaxed whitespace-pre-wrap">
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
                <div className="mb-8">
                  <div className="flex items-start space-x-3 py-4">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span>Searching and analyzing...</span>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
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

      {/* Floating Input - Perplexity Style */}
      {hasMessages && (
        <div className="fixed bottom-6 left-4 lg:left-24 right-4 z-20">
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-lg border border-gray-200 shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-400 transition-all duration-200 bg-white">
              <div className="flex items-center pl-4 lg:pl-6 pr-2 py-4 lg:py-6">
                <Search className="w-4 lg:w-5 h-4 lg:h-5 text-gray-400 mr-3 lg:mr-4 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me question..."
                  className="flex-1 text-sm lg:text-base bg-transparent border-none outline-none placeholder-gray-500 text-gray-900 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleInputFocus}
                  disabled={isLoading}
                  autoFocus
                />
                <div className="flex items-center space-x-1 lg:space-x-2 ml-2 lg:ml-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-8 h-8 lg:w-9 lg:h-9 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    disabled={isLoading}
                  >
                    <Camera className="w-3 h-3 lg:w-4 lg:h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-8 h-8 lg:w-9 lg:h-9 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    disabled={isLoading}
                  >
                    <Mic className="w-3 h-3 lg:w-4 lg:h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-8 h-8 lg:w-9 lg:h-9 p-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-sm disabled:opacity-50"
                    onClick={() => handleSearch()}
                    disabled={isLoading || !searchQuery.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="w-3 h-3 lg:w-4 lg:h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
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
