import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string;
  text?: string;
  className?: string;
}

const BackButton: FC<BackButtonProps> = ({
  to = "/",
  text = "Back to Store",
  className = "w-full px-5 mt-5"
}) => {
  return (
    <div className={className}>
      <Link 
        to={to} 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        {text}
      </Link>
    </div>
  );
};

export default BackButton;
