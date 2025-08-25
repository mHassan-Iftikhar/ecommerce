import { useState, type FC } from "react";
import { Trash2 } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  category: string;
}

const AllProductsSection: FC = () => {
  const [products, setProducts] = useState<Product[]>(
    JSON.parse(localStorage.getItem('products') || '[]')
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-medium mb-4">All Products</h2>
      
      {/* Search Bar */}
      <div className="mb-6 w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products by name..."
          className="border border-gray-300 rounded-lg p-2 w-full max-w-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-3 flex flex-col justify-between max-w-xs"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-800 truncate">
                  {product.title}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-3 h-3 text-gray-600 hover:text-red-600" />
                  </button>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-600">${product.price}</span>
            </div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-28 object-contain rounded-lg bg-gray-100 mt-2"
            />
            <div className="mt-2">
              <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">{product.category}</span>
                <span className="text-xs text-yellow-600">★ {product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && searchQuery && (
        <div className="text-center py-8 text-gray-500">
          No products found matching "{searchQuery}"
        </div>
      )}

      {products.length === 0 && !searchQuery && (
        <div className="text-center py-8 text-gray-500">
          No products available. Add some products first!
        </div>
      )}
    </div>
  );
};

export default AllProductsSection;
