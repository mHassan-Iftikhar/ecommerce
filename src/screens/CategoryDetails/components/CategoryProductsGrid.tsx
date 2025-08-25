import { type FC } from "react";
import { Heart, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

interface CategoryProductsGridProps {
  products: Product[];
  categoryName: string;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

const CategoryProductsGrid: FC<CategoryProductsGridProps> = ({
  products,
  categoryName,
  onAddToCart,
  onAddToWishlist,
  onProductClick
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (products.length === 0) {
    return (
      <div className="w-full p-5">
        <div className="w-full flex justify-center">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-md">
            <div className="text-gray-500 text-lg mb-2">No products found</div>
            <p className="text-gray-400">No products found in {categoryName}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg h-auto flex flex-col justify-between cursor-pointer group max-w-sm mx-auto w-full"
              onClick={() => onProductClick(product.id)}
            >
              {/* Header with title, price and action buttons */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-2 overflow-hidden">
                  <h3 
                    className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors mb-2"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: '2.5rem'
                    }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-base font-semibold text-gray-700 mb-2">
                    {formatPrice(product.price)}
                  </p>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      {product.reviews && (
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Action buttons */}
                <div 
                  className="flex flex-col space-y-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onAddToWishlist(product.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Add to Wishlist"
                  >
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Product image */}
              <div className="mt-auto">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-cover rounded-xl" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsGrid;
