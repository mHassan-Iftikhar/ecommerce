import { useState, useEffect, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import ActionIcons from "./components/ActionIcons";
import AuthButtons from "./components/AuthButtons";
import ProfileMenu from "./components/ProfileMenu";
import MobileMenu from "./components/MobileMenu";
import { AuthManager } from "../../../utils/AuthManager";

const Header: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for storage changes to update auth status
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    // Listen for custom auth events
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const checkAuthStatus = () => {
    const user = AuthManager.getCurrentUser();
    setCurrentUser(user);
    setIsAuthenticated(!!user);
  };

  const handleLogout = () => {
    AuthManager.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="w-full h-[60px] flex items-center justify-between px-5 relative">
      <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-bold">
        Logo.
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-3">
        <nav className="px-5 py-3 rounded-lg bg-gray-100">
          <NavLinks />
        </nav>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <ActionIcons />
        {isAuthenticated ? (
          <ProfileMenu 
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        ) : (
          <AuthButtons />
        )}
      </div>

      {/* Mobile Nav */}
      <MobileMenu 
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
