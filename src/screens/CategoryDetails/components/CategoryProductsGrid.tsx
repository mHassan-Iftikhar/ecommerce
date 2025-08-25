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
    <div className="w-full p-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 justify-start">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-2xl shadow-md p-3 transition hover:shadow-lg h-72 flex flex-col justify-between cursor-pointer group"
              onClick={() => onProductClick(product.id)}
            >
              {/* Header with title, price and action buttons */}
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-1">
                  <h3 className="text-md font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    {formatPrice(product.price)}
                  </p>
                  {product.rating && (
                    <div className="flex items-center gap-1 mt-1">
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
                  className="flex space-x-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onAddToWishlist(product.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Add to Wishlist"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Product image */}
              <div className="mt-3">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-44 object-cover rounded-xl" 
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
