import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    joinDate?: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">Premium Member</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <span className="text-gray-700">{user.email}</span>
        </div>
        
        {user.phone && (
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700">{user.phone}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-gray-700">
            Member since {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
