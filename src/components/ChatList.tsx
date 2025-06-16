
import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatData {
  courseId: string;
  messages: Array<{
    _id: string;
    senderId: string;
    senderRole: string;
    type: string;
    content: {
      text: string;
    };
    createdAt: string;
    replyTo?: string;
  }>;
  chatId: string;
  name: string;
  lastActive: string;
  unreadForMentor: number;
  status: boolean;
  location: string;
}

interface ChatListProps {
  chats: ChatData[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  className?: string;
}

const ChatList = ({ chats, selectedChatId, onChatSelect, className }: ChatListProps) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days`;
    }
  };

  return (
    <div className={cn("w-80 bg-gray-50 border-r border-gray-200 flex flex-col", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">C</span>
          </div>
          <h2 className="font-medium text-gray-900">Chat</h2>
        </div>
        <div className="flex gap-4 mt-3 text-sm">
          <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
            My <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 ml-1">0</span>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            New <span className="bg-gray-300 text-gray-700 text-xs rounded-full px-1.5 py-0.5 ml-1">7</span>
          </button>
          <button className="text-gray-600 hover:text-gray-900">All chats</button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1];
          const isSelected = selectedChatId === chat.chatId;
          
          return (
            <div
              key={chat.chatId}
              onClick={() => onChatSelect(chat.chatId)}
              className={cn(
                "p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-100",
                isSelected && "bg-blue-50 border-l-4 border-l-blue-500"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {chat.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {getTimeAgo(lastMessage?.createdAt || chat.lastActive)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-1">
                    {lastMessage?.content.text || 'No messages yet'}
                  </p>
                  {chat.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{chat.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    chat.status ? "bg-green-500" : "bg-gray-300"
                  )} />
                  {chat.unreadForMentor > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {chat.unreadForMentor}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
