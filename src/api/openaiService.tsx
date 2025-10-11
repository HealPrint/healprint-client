// HealPrint AI Backend Service Integration
import { config } from '../config';
import type { ChatMessage, ChatResponse, Message, ConversationHistory, ConversationSummary } from '@/types';

const API_BASE_URL = config.CHAT_API_URL;

export class HealPrintService {
  private static userId = 'user_' + Math.random().toString(36).substr(2, 9);
  private static currentConversationId: string | null = null;
  
  // Initialize user ID once and keep it consistent
  static {
    // Try to get existing user ID from localStorage, or create new one
    const storedUserId = localStorage.getItem('healprint_user_id');
    if (storedUserId) {
      this.userId = storedUserId;
    } else {
      localStorage.setItem('healprint_user_id', this.userId);
    }
    
    // Try to get existing conversation ID from localStorage
    const storedConversationId = localStorage.getItem('healprint_conversation_id');
    if (storedConversationId) {
      this.currentConversationId = storedConversationId;
    }
  }

  static async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          user_id: this.userId
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Store conversation ID for future use
      this.currentConversationId = data.conversation_id;
      localStorage.setItem('healprint_conversation_id', data.conversation_id);
      
      return data;
    } catch (error) {
      console.error('HealPrint API Error:', error);
      return {
        response: '',
        conversation_id: '',
        message_id: '',
        assessment_stage: 'error',
        symptoms_collected: {},
        needs_diagnosis: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static async getConversationHistory(conversationId: string): Promise<ConversationHistory | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversation/${conversationId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      return null;
    }
  }

  static async getUserConversations(): Promise<ConversationSummary[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${this.userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.conversations || [];
    } catch (error) {
      console.error('Error fetching user conversations:', error);
      return [];
    }
  }

  static async createNewConversation(): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/new?user_id=${this.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.currentConversationId = data.conversation_id;
      localStorage.setItem('healprint_conversation_id', data.conversation_id);
      return data.conversation_id;
    } catch (error) {
      console.error('Error creating new conversation:', error);
      return null;
    }
  }

  static async deleteConversation(conversationId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversation/${conversationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }
  }

  static async analyzeConversation(conversationId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      return null;
    }
  }

  static async getConversationSummary(conversationId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversation/${conversationId}/summary`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching conversation summary:', error);
      return null;
    }
  }

  static getCurrentConversationId(): string | null {
    return this.currentConversationId;
  }

  static resetConversation(): void {
    this.currentConversationId = null;
    // Clear the conversation from localStorage
    localStorage.removeItem('healprint_conversation_id');
  }
  
  static getUserId(): string {
    return this.userId;
  }
}