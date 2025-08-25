import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, X } from "lucide-react";
import { Header, Footer } from "../../components";
import { AuthManager } from "../../utils/AuthManager";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating?: number;
  category?: string;
  inStock?: boolean;
}

const WishlistScreen: FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthManager.getCurrentUser();
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    loadWishlistItems(currentUser.email);
  }, [navigate]);

  const loadWishlistItems = (userEmail: string) => {
    const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
    setWishlistItems(userWishlist);
  };

  const removeFromWishlist = (productId: string) => {
    const currentUser = AuthManager.getCurrentUser();
    if (!currentUser) return;

    const userEmail = currentUser.email;
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    
    setWishlistItems(updatedWishlist);
    localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(updatedWishlist));
  };

  const addToCart = (productId: string) => {
    const currentUser = AuthManager.getCurrentUser();
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    const product = wishlistItems.find(item => item.id === productId);
    if (!product) return;

    const userEmail = currentUser.email;
    let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`) || '[]');
    const existingItem = userCart.find((item: any) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      userCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));
    alert('Product added to cart!');
  };

  const goToProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">My Wishlist</h1>
              <p className="text-gray-600">Your favorite items will appear here</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Start adding products you love to your wishlist</p>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist</p>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg min-h-80 h-full flex flex-col justify-between cursor-pointer group"
                onClick={() => goToProduct(product.id)}
              >
                {/* Top section: title, price, remove button */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 pr-2">
                    <h3 className="text-base font-medium text-gray-900 line-clamp-2">{product.title}</h3>
                    <p className="text-sm font-semibold text-gray-700 mt-1">${product.price}</p>
                    {product.category && (
                      <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Product image */}
                <div className="mb-4 flex-1 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-40 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-medium">Add to Cart</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className="flex items-center justify-center py-2 px-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Stock status */}
                {product.inStock !== undefined && (
                  <div className="mt-2 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WishlistScreen;