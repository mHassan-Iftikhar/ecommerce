import { useState, type FC } from "react";
import { Trash2, User, Mail } from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const UsersSection: FC = () => {
  const [users, setUsers] = useState<User[]>(() => 
    JSON.parse(localStorage.getItem('user') || '[]')
  );

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('user', JSON.stringify(updatedUsers));
    }
  };

  if (users.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
          <p className="text-gray-600">Manage registered users and their accounts</p>
        </div>
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p>Users will appear here when they register.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
        <p className="text-gray-600">Manage registered users and their accounts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.email.includes('@gmail.com')).length}
          </div>
          <div className="text-sm text-gray-600">Gmail Users</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-purple-600">
            {users.filter(u => u.username.length >= 6).length}
          </div>
          <div className="text-sm text-gray-600">Active Profiles</div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                title="Delete User"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-lg font-semibold text-gray-800">{user.username}</div>
                  <div className="text-xs text-gray-500">Username</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600 break-all">{user.email}</div>
                  <div className="text-xs text-gray-500">Email Address</div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  User ID: {user.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersSection;
