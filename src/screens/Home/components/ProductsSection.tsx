import { useState, useEffect, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { toast } from "../../../components/ui";
import { AuthManager } from "../../../utils/AuthManager";

interface ProductsSectionProps {
  className?: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  inStock: boolean;
}

const ProductsSection: FC<ProductsSectionProps> = ({
  className = "p-5"
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadRandomProducts();
    loadWishlistItems();
  }, []);

  const loadWishlistItems = () => {
    const currentUser = AuthManager.getCurrentUser();
    if (currentUser) {
      const userEmail = currentUser.email;
      const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      const wishlistIds = userWishlist.map((item: Product) => item.id);
      setWishlistItems(wishlistIds);
    }
  };

  const loadRandomProducts = () => {
    try {
      let allProducts = JSON.parse(localStorage.getItem('products') || '[]');
      
      // If no products exist, create sample products
      if (allProducts.length === 0) {
        const sampleProducts = [
          {
            id: '1',
            title: 'Wireless Headphones',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
            rating: 4,
            category: 'Electronics',
            inStock: true
          },
          {
            id: '2',
            title: 'Smart Watch',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
            rating: 5,
            category: 'Electronics',
            inStock: true
          },
          {
            id: '3',
            title: 'Running Shoes',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            rating: 4,
            category: 'Sports',
            inStock: true
          },
          {
            id: '4',
            title: 'Coffee Maker',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
            rating: 4,
            category: 'Home & Garden',
            inStock: true
          },
          {
            id: '5',
            title: 'Laptop Bag',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
            rating: 4,
            category: 'Fashion',
            inStock: false
          },
          {
            id: '6',
            title: 'Bluetooth Speaker',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
            rating: 5,
            category: 'Electronics',
            inStock: true
          },
          {
            id: '7',
            title: 'Gaming Mouse',
            price: 39.99,
            image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
            rating: 4,
            category: 'Electronics',
            inStock: true
          },
          {
            id: '8',
            title: 'Yoga Mat',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1506629905607-bb4cf5c8339b?w=300&h=300&fit=crop',
            rating: 4,
            category: 'Sports',
            inStock: true
          }
        ];
        
        localStorage.setItem('products', JSON.stringify(sampleProducts));
        allProducts = sampleProducts;
      }
      
      // Get 8 random products
      const shuffled = allProducts.sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 6));
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleAddToCart = (productId: string) => {
    const currentUser = AuthManager.getCurrentUser();
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
      const userEmail = currentUser.email;
      let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`) || '[]');
      const existingItem = userCart.find((item: any) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        userCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));
      toast.success('Product added to cart!');
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const currentUser = AuthManager.getCurrentUser();
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
      const userEmail = currentUser.email;
      let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      const existingItemIndex = userWishlist.findIndex((item: any) => item.id === productId);

      if (existingItemIndex > -1) {
        // Remove from wishlist
        userWishlist.splice(existingItemIndex, 1);
        localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(userWishlist));
        setWishlistItems(prev => prev.filter(id => id !== productId));
        toast.success('Product removed from wishlist!');
      } else {
        // Add to wishlist
        userWishlist.push(product);
        localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(userWishlist));
        setWishlistItems(prev => [...prev, productId]);
        toast.success('Product added to wishlist!');
      }
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={className}>
      <SectionHeader title="Featured Products" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <div 
            key={product.id}
            className="relative bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg min-h-80 h-full flex flex-col justify-between cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            {/* Top section: title, price, icons */}
            <div className="flex justify-between items-start">
              <div className="flex-1 mr-2 overflow-hidden">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWishlist(product.id);
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    wishlistItems.includes(product.id) 
                      ? 'bg-red-100 hover:bg-red-200' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      wishlistItems.includes(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>
                {/* Cart icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
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
        ))}
      </div>
      
      <div className="w-full flex items-center justify-center">
        <Link to="/products">
          <button className="mt-4 px-4 py-2 cursor-pointer text-sm sm:text-base hover:bg-gray-100 transition-colors">
            Show all Products <span className="ml-2">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsSection;
