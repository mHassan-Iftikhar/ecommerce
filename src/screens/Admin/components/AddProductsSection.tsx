import { useState, type FC } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  category: string;
}

const AddProductsSection: FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    rating: "",
    category: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = async () => {
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

    setIsSubmitting(true);

    try {
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      
      const newProduct: Product = {
        id: Date.now().toString(),
        title,
        price: Number(price),
        image,
        description,
        rating: ratingNum,
        category
      };

      const updatedProducts = [...existingProducts, newProduct];
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

      alert('Product added successfully!');
    } catch (error) {
      alert('Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-medium mb-4">Add New Product</h2>
      
      {/* Add Product Form */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Product Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
              min="0"
              step="0.01"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image URL *
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={4}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              placeholder="Enter rating (0-5)"
              min="0"
              max="5"
              step="0.1"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter product category"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleAddProduct}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {formData.title && formData.image && (
        <div className="mt-8 w-full max-w-2xl">
          <h3 className="text-lg font-medium mb-4 text-gray-800">Preview</h3>
          <div className="bg-white rounded-xl shadow p-4 max-w-xs">
            <div className="mb-2">
              <span className="text-sm font-semibold text-gray-800">
                {formData.title}
              </span>
            </div>
            <span className="text-xs font-medium text-gray-600">
              ${formData.price}
            </span>
            <img
              src={formData.image}
              alt={formData.title}
              className="w-full h-28 object-contain rounded-lg bg-gray-100 mt-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {formData.description && (
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {formData.description}
              </p>
            )}
            <div className="flex justify-between items-center mt-1">
              {formData.category && (
                <span className="text-xs text-gray-500">{formData.category}</span>
              )}
              {formData.rating && (
                <span className="text-xs text-yellow-600">★ {formData.rating}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductsSection;
