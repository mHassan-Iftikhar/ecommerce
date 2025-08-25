import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface WishlistItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    inStock: boolean;
  };
  onRemove: (productId: number) => void;
  onAddToCart: (product: any) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ product, onRemove, onAddToCart }) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Stock status badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          product.inStock 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Remove from wishlist */}
      <button
        onClick={() => onRemove(product.id)}
        className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white shadow-lg"
        title="Remove from wishlist"
      >
        <Heart className="w-4 h-4 text-red-500 fill-current" />
      </button>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm text-gray-500 font-medium">{product.category}</p>
          <h3 className="font-semibold text-gray-900 text-lg mt-1 line-clamp-2">{product.name}</h3>
        </div>

        {/* Rating */}
        {renderStars(product.rating)}

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            product.inStock
              ? 'bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
