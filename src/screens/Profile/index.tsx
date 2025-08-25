import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, Edit } from "lucide-react";
import { Header, Footer } from "../../components";
import { AuthManager } from "../../utils/AuthManager";

const ProfileScreen: FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthManager.getCurrentUser();
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {new Date(user.loginTime || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Username</p>
                      <p className="text-sm text-gray-600">{user.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Login</p>
                      <p className="text-sm text-gray-600">
                        {new Date(user.loginTime || Date.now()).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/order-tracking')}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">Track Your Orders</span>
                    <span className="text-gray-400">→</span>
                  </button>

                  <button
                    onClick={() => navigate('/wishlist')}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">View Wishlist</span>
                    <span className="text-gray-400">→</span>
                  </button>

                  <button
                    onClick={() => navigate('/cart')}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">View Cart</span>
                    <span className="text-gray-400">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileScreen;
