import { useState, useCallback } from 'react';
import { HealPrintService, ChatMessage, ChatResponse } from '../api/openaiService';

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (query: string) => Promise<void>;
  clearChat: () => void;
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setCurrentConversationId(null);
    setAssessmentStage('initial');
    setSymptomsCollected({});
    setNeedsDiagnosis(false);
    HealPrintService.resetConversation();
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    currentConversationId,
    assessmentStage,
    symptomsCollected,
    needsDiagnosis
  };
};