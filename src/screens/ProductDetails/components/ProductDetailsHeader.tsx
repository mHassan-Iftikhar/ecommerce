import { type FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProductDetailsHeader: FC = () => {
  
  return (
    <div className="w-full">
      <Link 
        to="/products" 
        className="inline-flex  items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>
    </div>
  );
};

export default ProductDetailsHeader;
