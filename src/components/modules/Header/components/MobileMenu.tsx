import { useState, type FC } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import ActionIcons from "./ActionIcons";
import ProfileMenu from "./ProfileMenu";

interface MobileMenuProps {
  isAuthenticated?: boolean;
  currentUser?: any;
  onLogout?: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isAuthenticated = false, currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleMenu} className="md:hidden text-2xl">
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-lg p-5 flex flex-col gap-4 md:hidden z-50 text-base sm:text-lg">
          <NavLinks
            listClassName="flex flex-col gap-2"
            linkClassName="text-gray-900 block"
            onLinkClick={toggleMenu}
          />
          <ActionIcons
            className="flex items-center gap-3"
            iconClassName="p-2 bg-gray-100 rounded-lg"
          />
          {isAuthenticated ? (
            <ProfileMenu 
              currentUser={currentUser}
              onLogout={onLogout || (() => {})}
            />
          ) : (
            <AuthButtons
              className="flex flex-col gap-2"
              buttonClassName="px-6 py-3 rounded-lg bg-gray-100 text-black text-sm"
            />
          )}
        </div>
      )}
    </>
  );
};

export default MobileMenu;
