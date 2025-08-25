import type { FC } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

interface AuthButtonsProps {
  className?: string;
  buttonClassName?: string;
  showLogout?: boolean;
  onLogout?: () => void;
  currentUser?: any;
}

const AuthButtons: FC<AuthButtonsProps> = ({
  className = "navButtons flex gap-2",
  buttonClassName = "px-6 py-4 rounded-lg bg-gray-100 text-black text-sm",
  showLogout = false,
  onLogout,
  currentUser,
}) => {
  if (showLogout && currentUser) {
    return (
      <div className="userSection">
        <ProfileDropdown user={currentUser} onLogout={onLogout || (() => {})} />
      </div>
    );
  }

  return (
    <div className={className}>
      <Link to="/auth/login" className={buttonClassName}>
        Login
      </Link>
      <Link to="/auth/signup" className={buttonClassName}>
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
