
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

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

interface ChatData {
  courseId: string;
  messages: Message[];
  chatId: string;
  name: string;
  lastActive: string;
  unreadForMentor: number;
  status: boolean;
  location: string;
}

const fetchAllChats = async (): Promise<ChatData[]> => {
  const response = await fetch('http://localhost:4000/chat/getAllChat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mentorId: "684d6e4dd81b093f655229b3"
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chats');
  }

  return response.json();
};

export const useChat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    data: chats = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['chats'],
    queryFn: fetchAllChats,
    retry: false, // Disable retry for demo purposes
    onError: (error) => {
      console.error('Error fetching chats:', error);
    }
  });

  // Auto-select first chat if available
  useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].chatId);
    }
  }, [chats, selectedChatId]);

  const selectedChat = chats.find(chat => chat.chatId === selectedChatId);

  return {
    chats,
    selectedChat,
    selectedChatId,
    setSelectedChatId,
    profileOpen,
    setProfileOpen,
    isLoading,
    error,
    refetch
  };
};
