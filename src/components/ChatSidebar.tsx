
import React from 'react';
import { Search, MessageSquare, Mail, Users, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  className?: string;
}

const ChatSidebar = ({ className }: ChatSidebarProps) => {
  const menuItems = [
    { icon: MessageSquare, label: 'All', count: 0, active: true },
    { icon: MessageSquare, label: 'Chat', count: 1, active: false },
    { icon: Mail, label: 'Email', count: 0, active: false },
    { icon: Users, label: 'Visitors online', count: 0, active: false },
  ];

  const connectItems = [
    { icon: Mail, label: 'Email', count: 0 },
    { icon: Settings, label: 'Facebook', count: 0 },
    { icon: Settings, label: 'Instagram', count: 0 },
  ];

  return (
    <div className={cn("w-48 bg-slate-800 text-white flex flex-col", className)}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Online</span>
          <span className="bg-red-500 text-xs rounded-full px-2 py-0.5 ml-auto">1</span>
        </div>
        <button className="text-xs text-slate-400 hover:text-white transition-colors">
          Leave conversation
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-slate-700">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-slate-700 text-white placeholder-slate-400 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-xs font-medium text-slate-400 mb-3">Conversations</h3>
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors",
                  item.active ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                {item.count > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {item.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div className="p-4 border-t border-slate-700">
          <h3 className="text-xs font-medium text-slate-400 mb-3">Connect</h3>
          <div className="space-y-1">
            {connectItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                <span className="text-slate-500">+</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Items */}
        <div className="p-4 border-t border-slate-700">
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
              <Users className="w-4 h-4" />
              <span>Team chat</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>Reports</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
