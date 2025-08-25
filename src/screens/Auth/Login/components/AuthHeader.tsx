import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface AuthHeaderProps {
  backLink?: string;
  backText?: string;
  className?: string;
}

const AuthHeader: FC<AuthHeaderProps> = ({
  backLink = "/",
  backText = "Back to Homepage",
  className = "absolute top-5 left-5 bg-gray-100 rounded-lg px-3 py-2"
}) => {
  return (
    <header className={className}>
      <Link to={backLink} className="text-gray-600 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        {backText}
      </Link>
    </header>
  );
};

export default AuthHeader;
