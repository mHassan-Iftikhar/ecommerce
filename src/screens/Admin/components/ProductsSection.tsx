import { useState, type FC } from "react";
import { Edit, Trash2 } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  category: string;
}

const ProductsSection: FC = () => {
  const [products, setProducts] = useState<Product[]>(
    JSON.parse(localStorage.getItem('products') || '[]')
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    rating: "",
    category: ""
  });

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = () => {
    const { title, price, image, description, rating, category } = formData;
    
    if (!title || !price || !image || !description || !category) {
      alert('Please fill all required fields.');
      return;
    }

    const ratingNum = Number(rating);
    if (ratingNum < 0 || ratingNum > 5) {
      alert('Rating must be between 0 and 5.');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      title,
      price: Number(price),
      image,
      description,
      rating: ratingNum,
      category
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Reset form
    setFormData({
      title: "",
      price: "",
      image: "",
      description: "",
      rating: "",
      category: ""
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product.id);
    setFormData({
      title: product.title,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      rating: product.rating.toString(),
      category: product.category
    });
  };

  const handleSaveChanges = () => {
    if (!editingProduct) return;
    
    const { title, price, image, description, rating, category } = formData;
    
    if (!title || !price || !image || !description || !category) {
      alert('Please fill all required fields.');
      return;
    }

    const ratingNum = Number(rating);
    if (ratingNum < 0 || ratingNum > 5) {
      alert('Rating must be between 0 and 5.');
      return;
    }

    const updatedProducts = products.map(product =>
      product.id === editingProduct
        ? {
            ...product,
            title,
            price: Number(price),
            image,
            description,
            rating: ratingNum,
            category
          }
        : product
    );

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Reset form and editing state
    setEditingProduct(null);
    setFormData({
      title: "",
      price: "",
      image: "",
      description: "",
      rating: "",
      category: ""
    });
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-medium mb-4">Products</h2>
      
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

      {/* Add/Edit Product Form */}
      <div className="w-full max-w-2xl bg-gray-50 p-4 rounded-lg mb-6">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="border p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className="border p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="Product Image URL"
          className="border p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          className="border p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          placeholder="Product Rating (0-5)"
          min="0"
          max="5"
          step="0.1"
          className="border p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Product Category"
          className="border p-2 rounded-lg w-full mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2 flex-wrap">
          {editingProduct ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    title: "",
                    price: "",
                    image: "",
                    description: "",
                    rating: "",
                    category: ""
                  });
                }}
                className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition"
            >
              Add Product
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
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
              className="w-full h-36 object-contain rounded-lg bg-gray-100 mt-2"
            />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && searchQuery && (
        <div className="text-center py-8 text-gray-500">
          No products found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
