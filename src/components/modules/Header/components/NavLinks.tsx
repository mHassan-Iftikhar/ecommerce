import type { FC } from "react";
import { Link } from "react-router-dom";

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
  listClassName = "flex gap-10 list-none text-sm md:text-base",
  onLinkClick,
}) => {
  return (
    <ul className={listClassName}>
      {navLinks.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className={linkClassName} onClick={onLinkClick}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
