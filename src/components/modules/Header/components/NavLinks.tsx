import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/contact", label: "Contact" },
];

interface NavLinksProps {
  linkClassName?: string;
  listClassName?: string;
  onLinkClick?: () => void;
}

const NavLinks: FC<NavLinksProps> = ({
  linkClassName = "text-gray-900",
  listClassName = "flex gap-2 list-none text-sm md:text-base",
  onLinkClick,
}) => {
  const location = useLocation();

  return (
    <ul className={listClassName}>
      {navLinks.map((link) => {
        const isActive = location.pathname === link.to || 
          (link.to !== "/" && location.pathname.startsWith(link.to));
        
        return (
          <li key={link.to}>
            <Link 
              to={link.to} 
              className={`${linkClassName} px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 ${
                isActive ? 'bg-gray-200 text-gray-800 font-medium' : ''
              }`}
              onClick={onLinkClick}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
