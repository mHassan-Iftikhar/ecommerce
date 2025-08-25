import { type FC } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { AuthManager } from "../../../utils/AuthManager";
import StarRating from "./StarRating";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

interface ProductInfoProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
}

const ProductInfo: FC<ProductInfoProps> = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const currentUser = AuthManager.getCurrentUser();

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Please login to add items to cart');
      return;
    }
    onAddToCart(product.id);
  };

  const handleAddToWishlist = () => {
    if (!currentUser) {
      alert('Please login to add items to wishlist');
      return;
    }
    onAddToWishlist(product.id);
  };

  return (
    <div className="space-y-8 flex flex-col justify-between h-full">
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
            {product.inStock !== false && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                In Stock
              </span>
            )}
          </div>
        </div>
        
        {product.rating && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Reviews</h3>
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
        )}
        
        {product.description && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          </div>
        )}
        
        {product.category && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Category</h3>
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              {product.category}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-3 text-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 text-lg border border-gray-300"
          >
            <Heart className="w-6 h-6" />
            Add to Wishlist
          </button>
        </div>
        
        {/* Additional product info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Free Shipping
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            30-Day Returns
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
