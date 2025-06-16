
import React, { useState } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  _id: string;
  senderId: string;
  senderRole: string;
  type: string;
  content: {
    text: string;
  };
  createdAt: string;
  replyTo?: string;
}

interface ChatAreaProps {
  messages: Message[];
  chatName: string;
  className?: string;
}

const ChatArea = ({ messages, chatName, className }: ChatAreaProps) => {
  const [newMessage, setNewMessage] = useState('');

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("flex-1 flex flex-col bg-white", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {chatName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{chatName}</h2>
              <p className="text-sm text-gray-500">1:06 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isUser = message.senderRole === 'user';
            const isBot = message.senderId === 'bot';
            
            return (
              <div key={message._id} className="space-y-2">
                {index === 0 && (
                  <div className="text-center">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Today
                    </span>
                  </div>
                )}
                
                <div className={cn(
                  "flex gap-3",
                  isUser ? "justify-end" : "justify-start"
                )}>
                  {!isUser && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">
                        {isBot ? 'CB' : 'T'}
                      </span>
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                    isUser 
                      ? "bg-blue-500 text-white" 
                      : isBot 
                        ? "bg-green-100 text-gray-900 border border-green-200"
                        : "bg-gray-100 text-gray-900"
                  )}>
                    {!isUser && !isBot && (
                      <div className="text-xs font-medium mb-1 text-gray-600">
                        {chatName} • {formatTime(message.createdAt)}
                      </div>
                    )}
                    {isBot && (
                      <div className="text-xs font-medium mb-1 text-green-700">
                        Chatra Bot • {formatTime(message.createdAt)}
                      </div>
                    )}
                    <p className="text-sm">{message.content.text}</p>
                    {isUser && (
                      <div className="text-xs mt-1 opacity-75">
                        {formatTime(message.createdAt)}
                      </div>
                    )}
                  </div>
                  
                  {isUser && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-700 text-xs font-medium">T</span>
                    </div>
                  )}
                </div>
                
                {message.replyTo && (
                  <div className="text-xs text-gray-500 ml-11">
                    Reply to previous message
                  </div>
                )}
              </div>
            );
          })
        )}
        
        {/* Bot status */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">CB</span>
            </div>
            <span>Chatra Bot</span>
          </div>
          <span>1:06 PM</span>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            Thanks for your message! The team will reply as soon as possible here or by email (test@gmail.com)
          </p>
        </div>
        
        <div className="text-center">
          <span className="text-xs text-gray-500">test seems to be offline</span>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 min-h-[40px] max-h-32 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-3 py-2 resize-none border-0 focus:outline-none focus:ring-0 rounded-lg"
              rows={1}
            />
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
            <Smile className="w-5 h-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
