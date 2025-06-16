
import React from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatList from '@/components/ChatList';
import ChatArea from '@/components/ChatArea';
import UserProfile from '@/components/UserProfile';
import { useChat } from '@/hooks/useChat';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const Index = () => {
  const {
    chats,
    selectedChat,
    selectedChatId,
    setSelectedChatId,
    profileOpen,
    setProfileOpen,
    isLoading,
    error,
    refetch
  } = useChat();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading chats...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Failed to load chats</h2>
          <p className="text-gray-600 mb-4">
            Unable to connect to the chat server. Please check if the API is running on localhost:4000
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <ChatSidebar />
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onChatSelect={(chatId) => {
          setSelectedChatId(chatId);
          setProfileOpen(true);
        }}
      />
      <ChatArea
        messages={selectedChat?.messages || []}
        chatName={selectedChat?.name || 'Select a chat'}
      />
      <UserProfile
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  );
};

export default Index;
