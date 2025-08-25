import React from 'react';
import { Edit, Key, Trash2, ShoppingBag } from 'lucide-react';

interface ProfileActionsProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onDeleteAccount: () => void;
  onViewOrders: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  onEditProfile,
  onChangePassword,
  onDeleteAccount,
  onViewOrders
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={onEditProfile}
        className="bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-3"
      >
        <Edit className="w-5 h-5" />
        <span className="font-medium">Edit Profile</span>
      </button>

      <button
        onClick={onChangePassword}
        className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 hover:bg-green-100 transition-colors flex items-center gap-3"
      >
        <Key className="w-5 h-5" />
        <span className="font-medium">Change Password</span>
      </button>

      <button
        onClick={onViewOrders}
        className="bg-purple-50 text-purple-700 p-4 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors flex items-center gap-3"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="font-medium">View Orders</span>
      </button>

      <button
        onClick={onDeleteAccount}
        className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-3"
      >
        <Trash2 className="w-5 h-5" />
        <span className="font-medium">Delete Account</span>
      </button>
    </div>
  );
};

export default ProfileActions;
