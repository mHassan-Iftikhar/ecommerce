import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthManager } from "../../utils/AuthManager";
import { 
  AdminSidebar, 
  Dashboard, 
  UsersSection, 
  AddProductsSection,
  AllProductsSection,
  OrdersSection,
  CategoriesSection 
} from "./components";

const AdminScreen = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    // Check if user is authenticated and is admin
    const currentUser = AuthManager.getCurrentUser();
    if (!currentUser || currentUser.email !== 'hassan@admin.panel') {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersSection />;
      case 'products':
        return <AddProductsSection />;
      case 'all-products':
        return <AllProductsSection />;
      case 'orders':
        return <OrdersSection />;
      case 'categories':
        return <CategoriesSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="flex">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminScreen;
