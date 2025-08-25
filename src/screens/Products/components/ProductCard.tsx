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
  onAddToWishlist: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onProductClick
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
    onAddToWishlist(product.id);
  };

  return (
    <div 
      className="relative bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg min-h-80 h-full flex flex-col justify-between cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Top section: title, price, icons */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-medium text-gray-900">{product.title}</h3>
          <p className="text-sm font-semibold text-gray-700">${product.price}</p>
        </div>
        <div className="flex space-x-2">
          {/* Wishlist icon */}
          <button
            onClick={handleAddToWishlist}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Heart className="w-4 h-4 text-gray-600" />
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
