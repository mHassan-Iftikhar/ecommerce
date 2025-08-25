import type { FC } from "react";
import { Link } from "react-router-dom";

interface AuthButtonsProps {
  className?: string;
  buttonClassName?: string;
  showLogout?: boolean;
  onLogout?: () => void;
}

const AuthButtons: FC<AuthButtonsProps> = ({
  className = "navButtons flex gap-2",
  buttonClassName = "px-6 py-4 rounded-lg bg-gray-100 text-black text-sm",
  showLogout = false,
  onLogout,
}) => {
  if (showLogout) {
    return (
      <div className="userSection flex flex-col gap-2">
        <button
          onClick={onLogout}
          className="logoutBtn px-4 py-3 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
        >
          Logout
        </button>
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
