import { type FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";

const ProductDetailsHeader: FC = () => {
  
  return (
    <nav className="flex gap-5 items-center justify-between mb-12 bg-white rounded-xl p-4 shadow-sm">
      <Link 
        to="/" 
        className="text-gray-600 flex items-center gap-3 hover:text-gray-900 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Homepage
      </Link>
      
      <div className="flex gap-3">
        <Link 
          to="/wishlist" 
          className="text-gray-700 bg-gray-100 rounded-lg p-3 flex items-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <Heart className="w-5 h-5" />
        </Link>
        <Link 
          to="/cart" 
          className="text-gray-700 bg-gray-100 rounded-lg p-3 flex items-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
};

export default ProductDetailsHeader;
