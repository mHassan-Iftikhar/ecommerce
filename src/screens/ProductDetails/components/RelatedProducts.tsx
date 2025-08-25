import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";

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

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
}

const RelatedProducts: FC<RelatedProductsProps> = ({ currentProductId, category }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadRelatedProducts();
  }, [currentProductId, category]);

  const loadRelatedProducts = () => {
    try {
      const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Filter products: same category or random if no category
      let filtered = products.filter(p => p.id !== currentProductId);
      
      if (category) {
        const sameCategory = filtered.filter(p => p.category === category);
        if (sameCategory.length >= 4) {
          filtered = sameCategory;
        }
      }
      
      // Shuffle and take first 4
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffled.slice(0, 4));
    } catch (error) {
      console.error('Error loading related products:', error);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      alert('Please login to add items to cart');
      return;
    }

    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const userEmail = currentUser.email;
      let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`) || '[]');
      const existingItem = userCart.find((item: any) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        userCart.push({ ...productToAdd, quantity: 1 });
      }

      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));
      alert('Product added to cart!');
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      alert('Please login to add items to wishlist');
      return;
    }

    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const userEmail = currentUser.email;
      let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      const existingItem = userWishlist.find((item: Product) => item.id === productId);

      if (existingItem) {
        alert('Product is already in your wishlist!');
      } else {
        userWishlist.push(productToAdd);
        localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(userWishlist));
        alert('Product added to wishlist!');
      }
    }
  };

  if (relatedProducts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No related products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <div
          key={product.id}
          className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => handleProductClick(product.id)}
        >
          <div className="relative mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain rounded-lg bg-white p-2 group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={(e) => handleAddToWishlist(e, product.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 text-sm truncate">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.rating && (
                <span className="text-sm text-yellow-600 flex items-center">
                  ⭐ {product.rating}
                </span>
              )}
            </div>
            
            <button
              onClick={(e) => handleAddToCart(e, product.id)}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
