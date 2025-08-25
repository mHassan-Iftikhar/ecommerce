import { type FC } from "react";

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

interface CategorySectionProps {
  title: string;
  products: Product[];
  onViewCategory: (categoryName: string) => void;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

const CategorySection: FC<CategorySectionProps> = ({ 
  title, 
  products, 
  onViewCategory,
  onProductClick
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const displayProducts = products.slice(0, 6);

  return (
    <section className="bg-white rounded-2xl shadow-md p-5 mx-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <button
          onClick={() => onViewCategory(title)}
          className="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors"
        >
          View all
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product.id)}
              className="w-[270px] group bg-white rounded-2xl shadow hover:shadow-md p-3 flex gap-3 cursor-pointer transition-all duration-200 flex-shrink-0 border border-gray-100 hover:border-gray-200"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200" 
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {product.title}
                </div>
                <div className="text-sm font-semibold text-gray-800 mb-2">
                  {formatPrice(product.price)}
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-xs text-gray-600">{product.rating}</span>
                    {product.reviews && (
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 py-8 w-full text-center">
            No items found in {title}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
