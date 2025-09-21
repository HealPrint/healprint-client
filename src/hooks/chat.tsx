import { useState, useCallback, useEffect } from 'react';
import { HealPrintService, ChatMessage, ChatResponse, ConversationHistory } from '../api/openaiService';
import { useChatHistory } from '../contexts/ChatHistoryContext';

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (query: string) => Promise<void>;
  clearChat: () => void;
  startNewChat: () => void;
  loadConversation: (conversationId: string) => void;
  currentConversationId: string | null;
  assessmentStage: string;
  symptomsCollected: Record<string, any>;
  needsDiagnosis: boolean;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [assessmentStage, setAssessmentStage] = useState<string>('initial');
  const [symptomsCollected, setSymptomsCollected] = useState<Record<string, any>>({});
  const [needsDiagnosis, setNeedsDiagnosis] = useState<boolean>(false);
  
  const { 
    addConversation, 
    updateConversation, 
    setCurrentConversation,
    currentConversationId: contextCurrentId 
  } = useChatHistory();

  const sendMessage = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    const userMessage: ChatMessage = { 
      role: 'user', 
      content: query,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response: ChatResponse = await HealPrintService.sendMessage(query);
      
      if (response.error) {
        setError(response.error);
        return;
      }

      // Update conversation state
      setCurrentConversationId(response.conversation_id);
      setAssessmentStage(response.assessment_stage);
      setSymptomsCollected(response.symptoms_collected);
      setNeedsDiagnosis(response.needs_diagnosis);

      // Add assistant response
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: response.response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Create or update conversation in history
      const isNewConversation = !currentConversationId;
      
      if (isNewConversation) {
        // Create new conversation
        const title = query.length > 50 ? query.substring(0, 50) + '...' : query;
        addConversation({
          id: response.conversation_id,
          title,
          lastMessage: response.response,
          timestamp: new Date(),
          messageCount: 2 // user + assistant message
        });
        setCurrentConversation(response.conversation_id);
      } else {
        // Update existing conversation
        updateConversation(response.conversation_id, {
          lastMessage: response.response,
          timestamp: new Date(),
          messageCount: messages.length + 2
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentConversationId, messages.length, addConversation, updateConversation, setCurrentConversation]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setCurrentConversationId(null);
    setAssessmentStage('initial');
    setSymptomsCollected({});
    setNeedsDiagnosis(false);
    HealPrintService.resetConversation();
    setCurrentConversation(null);
  }, [setCurrentConversation]);

  const startNewChat = useCallback(() => {
    clearChat();
    // Reset conversation ID to null for new chat
    setCurrentConversationId(null);
    setCurrentConversation(null);
  }, [clearChat, setCurrentConversation]);

  const loadConversation = useCallback(async (conversationId: string) => {
    // Prevent unnecessary re-loading if already on the same conversation
    if (currentConversationId === conversationId) {
      return;
    }
    
    try {
      setCurrentConversationId(conversationId);
      setCurrentConversation(conversationId);
      setError(null);
      setIsLoading(true);
      
      // Load conversation history from optimized backend
      const conversationHistory = await HealPrintService.getConversationHistory(conversationId);
      if (conversationHistory) {
        // Convert backend messages to frontend format
        const loadedMessages: ChatMessage[] = conversationHistory.messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: msg.timestamp
        }));
        
        setMessages(loadedMessages);
        setCurrentConversationId(conversationId);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Chat Hook: Error loading conversation:', error);
      setError('Failed to load conversation');
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, [setCurrentConversation, currentConversationId, messages.length]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    startNewChat,
    loadConversation,
    currentConversationId,
    assessmentStage,
    symptomsCollected,
    needsDiagnosis
  };
};