import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowLeft } from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar: FC<AdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Users' },
    { id: 'products', label: 'Add Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'all-products', label: 'All Products' },
    { id: 'categories', label: 'Categories' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-white border-none rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-105 md:hidden"
      >
        <Menu className="w-6 h-6 text-indigo-600" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Mobile close button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 bg-white border-none rounded-full w-10 h-10 flex items-center justify-center shadow-sm md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-light text-gray-700">Admin Panel</h2>
          </div>
          
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={`text-left py-2 px-4 rounded-lg transition ${
                  activeSection === item.id
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-500 font-light hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="flex items-center text-green-600 font-light hover:bg-gray-100 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Store
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
