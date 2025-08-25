import { useState, useEffect } from "react";
import { Header, Footer } from "../../components";
import { AuthManager } from "../../utils/AuthManager";
import { User, Mail, Calendar, Edit, Eye, EyeOff } from "lucide-react";
import { toast } from "../../components/ui";

const ProfileScreen = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [editForm, setEditForm] = useState({
    username: '',
    email: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const user = AuthManager.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setEditForm({
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, []);

  // Handler functions
  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleUpdateProfile = () => {
    try {
      const users = JSON.parse(localStorage.getItem('user') || '[]');
      const updatedUsers = users.map((user: any) => 
        user.email === currentUser.email 
          ? { ...user, username: editForm.username, email: editForm.email }
          : user
      );
      localStorage.setItem('user', JSON.stringify(updatedUsers));
      
      // Update current user
      const updatedCurrentUser = { ...currentUser, username: editForm.username, email: editForm.email };
      AuthManager.setAuth(updatedCurrentUser);
      setCurrentUser(updatedCurrentUser);
      
      setShowEditModal(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('user') || '[]');
      const userIndex = users.findIndex((user: any) => user.email === currentUser.email);
      
      if (userIndex !== -1 && users[userIndex].password === passwordForm.currentPassword) {
        users[userIndex].password = passwordForm.newPassword;
        localStorage.setItem('user', JSON.stringify(users));
        
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        toast.success('Password changed successfully!');
      } else {
        toast.error('Current password is incorrect');
      }
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    try {
      const users = JSON.parse(localStorage.getItem('user') || '[]');
      const updatedUsers = users.filter((user: any) => user.email !== currentUser.email);
      localStorage.setItem('user', JSON.stringify(updatedUsers));
      
      AuthManager.logout();
      toast.success('Account deleted successfully');
      window.location.href = '/';
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Please login to view your profile</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header - Right Aligned */}
        <div className="w-full mb-8 px-4 md:px-10 pt-16">
          <div className="flex items-center justify-end gap-3 mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900">My Profile</h1>
            <div className="rounded-full w-6 sm:w-8 h-6 sm:h-8 border border-gray-800 flex justify-center items-center">
              <div className="w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-gray-800"></div>
            </div>
          </div>
          <p className="text-gray-600 text-sm md:text-base text-right">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="max-w-6xl mx-auto px-4 md:px-10">
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 border border-gray-100">
            {/* Profile Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-10 pb-8 border-b border-gray-100">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 md:w-14 md:h-14 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                  {currentUser.username}
                </h2>
                <p className="text-gray-600 text-lg md:text-xl mb-2">{currentUser.email}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date(currentUser.loginTime).toLocaleDateString()}</span>
                </div>
              </div>
              <button 
                onClick={handleEditProfile}
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                <Edit className="w-4 h-4" />
                <span className="font-medium">Edit Profile</span>
              </button>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-8">
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-5 h-5 mr-3 text-gray-500" />
                    Username
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 font-medium">
                    {currentUser.username}
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Mail className="w-5 h-5 mr-3 text-gray-500" />
                    Email Address
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 font-medium">
                    {currentUser.email}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                    Last Login
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 font-medium">
                    {new Date(currentUser.loginTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-5 h-5 mr-3 text-gray-500" />
                    Account Type
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      AuthManager.isAdmin() 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {AuthManager.isAdmin() ? 'Administrator' : 'Customer'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Account Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button 
                  onClick={handleUpdateProfile}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-all duration-200 border border-blue-200 hover:border-blue-300 font-medium"
                >
                  <Edit className="w-5 h-5" />
                  Update Profile
                </button>
                <button 
                  onClick={handleChangePassword}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 font-medium"
                >
                  <Calendar className="w-5 h-5" />
                  Change Password
                </button>
                <button 
                  onClick={handleDeleteAccount}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-300 font-medium"
                >
                  <User className="w-5 h-5" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePassword}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-red-600 mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and you will lose all your data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfileScreen;