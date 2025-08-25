import { useState, type FC } from "react";
import { Trash2, Edit3 } from "lucide-react";
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
  const [showEditModal, setShowEditModal] = useState(false);
  // Removed unused productToEdit state
  const [editFormData, setEditFormData] = useState<Product>({
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    rating: 0,
    category: ''
  });

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditFormData(product);
    setShowEditModal(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' ? Number(value) : value
    }));
  };

  const saveEditProduct = () => {
    if (!editFormData.title || !editFormData.price || !editFormData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedProducts = products.map(product => 
      product.id === editFormData.id ? editFormData : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast.success('Product updated successfully');
    
    setShowEditModal(false);
  };

  const cancelEdit = () => {
    setShowEditModal(false);
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
            className="bg-white rounded-xl shadow p-3 flex flex-col justify-between max-w-xs h-64 overflow-hidden"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="text-md font-semibold text-gray-800 flex-1 mr-2"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {product.title}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition"
                    title="Edit Product"
                  >
                    <Edit3 className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition"
                    title="Delete Product"
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
            <div className="mt-2 flex-1 overflow-hidden">
              <p 
                className="text-xs text-gray-500 overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-500 truncate">{product.category}</span>
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

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Edit Product
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={editFormData.price}
                  onChange={handleEditFormChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditFormChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={editFormData.rating}
                  onChange={handleEditFormChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={cancelEdit}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditProduct}
                className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsSection;
