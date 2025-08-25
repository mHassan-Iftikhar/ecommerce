import { useState, type FC } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "../../../components/ui";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const UsersSection: FC = () => {
  const [users, setUsers] = useState<User[]>(
    JSON.parse(localStorage.getItem('user') || '[]')
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    if (!userToDelete) return;

    const updatedUsers = users.filter(user => user.id !== userToDelete.id);
    setUsers(updatedUsers);
    localStorage.setItem('user', JSON.stringify(updatedUsers));
    toast.success(`User "${userToDelete.username}" has been deleted`);
    
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  if (users.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-medium mb-6">Users</h2>
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No users found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-medium mb-6">Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow p-5 relative h-48"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDeleteUser(user)}
              className="absolute top-3 right-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete User"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* User Info */}
            <div className="flex items-center gap-4 mt-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl font-bold text-green-600">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-800">{user.username}</div>
                <div className="text-gray-500 text-sm">{user.email}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete user "{userToDelete.username}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersSection;
