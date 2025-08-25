import type { FC } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ShieldUser } from "lucide-react";
import { AuthManager } from "../../../../utils/AuthManager";

interface ActionIconsProps {
  className?: string;
  iconClassName?: string;
}

const ActionIcons: FC<ActionIconsProps> = ({
  className = "hidden md:flex items-center gap-3",
  iconClassName = "px-4 py-3 bg-gray-100 rounded-lg",
}) => {
  const isAdmin = AuthManager.isAdmin();

  return (
    <div className={className}>
      {/* Admin Panel Icon - Only show for admin */}
      {isAdmin && (
        <Link to="/admin" className={`${iconClassName} adminPanel`} title="Admin Panel">
          <ShieldUser />
        </Link>
      )}
      
      <Link to="/wishlist" className={iconClassName} title="Wishlist">
        <Heart />
      </Link>
      
      <Link to="/cart" className={iconClassName} title="Shopping Cart">
        <ShoppingCart />
      </Link>
    </div>
  );
};

export default ActionIcons;
