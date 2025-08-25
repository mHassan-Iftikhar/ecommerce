import type { FC } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";

interface CategoriesSectionProps {
  className?: string;
}

const CategoriesSection: FC<CategoriesSectionProps> = ({
  className = "p-5"
}) => {
  return (
    <div className={className}>
      <SectionHeader title="Categories" />
      
      <div id="collectionsContainer" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Categories will be dynamically loaded here */}
      </div>
      
      <div className="w-full flex items-center justify-center">
        <Link to="/categories">
          <button className="mt-4 px-4 py-2 cursor-pointer text-sm sm:text-base hover:bg-gray-100 transition-colors">
            Show all Categories <span className="ml-2">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesSection;
