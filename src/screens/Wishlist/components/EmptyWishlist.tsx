import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Package } from 'lucide-react';

const EmptyWishlist: React.FC = () => {
  return (
    <div className="text-center p-12">
      <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your wishlist is empty</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Save items you love to your wishlist for easy access later. Browse our collection to find your favorites!
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition-colors"
      >
        <Package className="w-5 h-5" />
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyWishlist;
