import { type FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface CategoryDetailsHeaderProps {
  categoryName: string;
}

const CategoryDetailsHeader: FC<CategoryDetailsHeaderProps> = ({ categoryName }) => {
  return (
    <div className="w-full px-2 sm:px-5 mt-5 mb-6">
      <Link 
        to="/categories" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Categories
      </Link>
      
      <div className="flex items-center gap-2 mt-4 mb-4">
        <div className="rounded-full w-6 sm:w-8 h-6 sm:h-8 border border-black flex justify-center items-center">
          <div className="w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-black"></div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-light">{categoryName}</h1>
      </div>
      
      <p className="text-gray-600">Explore all products in this category</p>
    </div>
  );
};

export default CategoryDetailsHeader;
