
import React from 'react';
import { X, Globe, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const UserProfile = ({ isOpen, onClose, className }: UserProfileProps) => {
  if (!isOpen) return null;

  return (
    <div className={cn("w-80 bg-white border-l border-gray-200 flex flex-col", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Contact Info</h3>
        <button 
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NAME</label>
          <p className="text-sm text-gray-900">test</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">EMAIL</label>
          <p className="text-sm text-gray-900">test@gmail.com</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
          <p className="text-sm text-gray-500">-</p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <p className="text-sm text-gray-500">-</p>
          <p className="text-xs text-gray-400 mt-1">Only visible to agents</p>
        </div>

        {/* Agents */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">AGENTS</label>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">M</span>
            </div>
            <span className="text-sm text-gray-900">mern.tutedude</span>
            <span className="text-xs text-gray-500">you</span>
          </div>
        </div>

        {/* Last Session */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LAST SESSION ON UPSKILL.TUTEDUDE.COM</label>
          <p className="text-sm text-gray-900">MERNSTACK Lecture Page</p>
          <p className="text-xs text-gray-500">51 minutes ago</p>
        </div>

        {/* Referrer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">REFERRER</label>
          <p className="text-sm text-gray-900">Direct traffic</p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LOCATION</label>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-900">Universe</p>
          </div>
        </div>

        {/* OS/Device */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OS / DEVICE</label>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-gray-500">🍎</div>
            <p className="text-sm text-gray-900">macOS Catalina (or newer)</p>
          </div>
        </div>

        {/* Browser */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">BROWSER</label>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-gray-500">🌐</div>
            <p className="text-sm text-gray-900">Chrome 137.0.0 (webkit)</p>
          </div>
        </div>

        {/* User Agent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">USER AGENT</label>
          <p className="text-xs text-gray-500 break-all">
            Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
