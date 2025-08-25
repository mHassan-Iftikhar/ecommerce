import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X, Package, Star } from 'lucide-react';
import { Header, Footer } from '../../components';
import { toast } from '../../components/ui';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    loadWishlist();
    document.title = "My Wishlist - E-commerce Store";
  }, []);

  const loadWishlist = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser.email) {
        const savedWishlist = localStorage.getItem(`wishlist_${currentUser.email}`);
        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist));
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const removeFromWishlist = (productId: number) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser.email) {
        const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
        setWishlistItems(updatedWishlist);
        localStorage.setItem(`wishlist_${currentUser.email}`, JSON.stringify(updatedWishlist));
        toast.success('Item removed from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist');
    }
  };

  const addToCart = (product: Product) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (!currentUser.email) {
        toast.error('Please login to add items to cart');
        return;
      }

      const existingCart = JSON.parse(localStorage.getItem(`cart_${currentUser.email}`) || '[]');
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(existingCart));
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

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

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    if (inStockItems.length === 0) {
      toast.warning('No in-stock items to add to cart');
      return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const existingCart = JSON.parse(localStorage.getItem(`cart_${currentUser.email}`) || '[]');
      
      inStockItems.forEach(product => {
        const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
        if (existingItemIndex > -1) {
          existingCart[existingItemIndex].quantity += 1;
        } else {
          existingCart.push({ ...product, quantity: 1 });
        }
      });

      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(existingCart));
      toast.success(`${inStockItems.length} items added to cart`);
    } catch (error) {
      console.error('Error adding items to cart:', error);
      toast.error('Failed to add items to cart');
    }
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (currentUser.email) {
          localStorage.removeItem(`wishlist_${currentUser.email}`);
          setWishlistItems([]);
          toast.success('Wishlist cleared');
        }
      } catch (error) {
        console.error('Error clearing wishlist:', error);
        toast.error('Failed to clear wishlist');
      }
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <div className="flex-1 py-8">
          <div className="max-w-6xl mx-auto px-4">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                  </li>
                  <li>
                    <span className="text-gray-400 mx-2">/</span>
                  </li>
                  <li className="text-gray-900 font-medium">Wishlist</li>
                </ol>
              </nav>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-10 h-10 text-red-500" />
                <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
              </div>
              <p className="text-gray-600 text-lg">You have 0 items in your wishlist</p>
            </div>

            {/* Empty State */}
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
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                </li>
                <li>
                  <span className="text-gray-400 mx-2">/</span>
                </li>
                <li className="text-gray-900 font-medium">Wishlist</li>
              </ol>
            </nav>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-red-500" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-600 text-lg">
                  You have {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
                </p>
              </div>
            </div>
            <Link
              to="/products"
              className="hidden md:block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={addAllToCart}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add All to Cart ({wishlistItems.filter(item => item.inStock).length} items)
              </button>
              
              <button
                onClick={clearWishlist}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Clear Wishlist
              </button>
            </div>
          </div>

          {/* Wishlist Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div 
                key={product.id}
                className="relative bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg min-h-80 h-full flex flex-col justify-between cursor-pointer group"
                onClick={() => window.location.href = `/product/${product.id}`}
              >
                {/* Top section: title, price, icons */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                    <p className="text-sm font-semibold text-gray-700">${product.price}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    {/* Remove from wishlist icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                    {/* Cart icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={!product.inStock}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                        product.inStock 
                          ? 'bg-gray-100 hover:bg-gray-200' 
                          : 'bg-gray-200 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className={`w-4 h-4 ${product.inStock ? 'text-gray-600' : 'text-gray-400'}`} />
                    </button>
                  </div>
                </div>

                {/* Product image */}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-56 object-cover rounded-xl" 
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="mt-2">
                  {renderStars(product.rating)}
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping on Mobile */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
