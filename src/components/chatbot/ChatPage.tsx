import React from 'react';
import HomePage from './chat';
import { useChat } from '../../hooks/chat';

const ChatPage: React.FC = () => {
  const { startNewChat, loadConversation } = useChat();

  return (
    <HomePage 
      onNewChat={startNewChat}
      onSelectConversation={loadConversation}
    />
  );
};

export default ChatPage;
