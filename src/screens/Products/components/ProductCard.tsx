import type { FC } from "react";
import { Heart, ShoppingCart } from "lucide-react";

export interface Product {
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

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onProductClick: (productId: string) => void;
  isInWishlist?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onProductClick,
  isInWishlist = false
}) => {
  const handleCardClick = () => {
    onProductClick(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  return (
    <div 
      className="relative bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg min-h-80 h-full flex flex-col justify-between cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Top section: title, price, icons */}
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-2">
          <h3 
            className="text-base font-medium text-gray-900"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {product.title}
          </h3>
          <p className="text-sm font-semibold text-gray-700">${product.price}</p>
        </div>
        <div className="flex space-x-2">
          {/* Wishlist icon */}
          <button
            onClick={handleAddToWishlist}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isInWishlist 
                ? 'bg-red-100 hover:bg-red-200' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Heart 
              className={`w-4 h-4 ${
                isInWishlist 
                  ? 'text-red-500 fill-current' 
                  : 'text-gray-600'
              }`} 
            />
          </button>
          {/* Cart icon */}
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ShoppingCart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product image */}
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-56 object-cover rounded-xl" 
      />
    </div>
  );
};

export default ProductCard;
