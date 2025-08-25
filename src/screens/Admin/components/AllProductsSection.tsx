import { useState, type FC } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "../../../components/ui";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = () => {
    if (!productToDelete) return;

    const updatedProducts = products.filter(product => product.id !== productToDelete);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast.success('Product deleted successfully');
    
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
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
                <span className="text-md font-semibold text-gray-800 truncate">
                  {product.title}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                  </button>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">${product.price}</span>
            </div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-28 object-contain rounded-lg bg-gray-100 mt-2"
            />
            <div className="mt-2">
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-500">{product.category}</span>
                <span className="text-sm text-yellow-600">★ {product.rating}</span>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsSection;
