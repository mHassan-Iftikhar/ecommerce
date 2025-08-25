import { useState, useEffect, type FC } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "../../../components/ui";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  category: string;
  inStock: boolean;
}

const AddProductsSection: FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    rating: "",
    category: "",
    inStock: true
  });

  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState("");

  // Load existing categories
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const uniqueCategories = [...new Set(
      products
        .map((product: Product) => product.category?.trim())
        .filter((category: string | undefined) => category && category.length > 0)
    )].sort() as string[];
    setCategories(uniqueCategories);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addImageField = () => {
    setAdditionalImages([...additionalImages, ""]);
  };

  const removeImageField = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const updateImageField = (index: number, value: string) => {
    const updated = [...additionalImages];
    updated[index] = value;
    setAdditionalImages(updated);
  };

  const handleAddProduct = async () => {
    const { title, price, image, description, rating, category, inStock } = formData;
    
    // No validations - admin can add anything
    setIsSubmitting(true);

    try {
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      
      const allImages = [image, ...additionalImages.filter(img => img.trim() !== "")];
      
      const newProduct: Product = {
        id: Date.now().toString(),
        title: title || "Untitled Product",
        price: Number(price) || 0,
        image: image || "https://via.placeholder.com/300",
        images: allImages.length > 1 ? allImages : undefined,
        description: description || "",
        rating: Number(rating) || 0,
        category: category || "",
        inStock: inStock
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
        category: "",
        inStock: true
      });
      setAdditionalImages([]);
      setCustomCategory("");

      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Error adding product. Please try again.');
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
              Product Name
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
              Product Price
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
              Main Product Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter main image URL"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Additional Images Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Images (Optional)
              </label>
              <button
                type="button"
                onClick={addImageField}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            </div>
            
            {additionalImages.map((imageUrl, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => updateImageField(index, e.target.value)}
                  placeholder={`Additional image URL ${index + 1}`}
                  className="border border-gray-300 p-3 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="w-12 h-12 flex items-center justify-center text-red-600 hover:text-red-800 border border-gray-300 rounded-lg hover:border-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
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
              Product Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="custom">+ Add Custom Category</option>
            </select>
            {formData.category === "custom" && (
              <input
                type="text"
                placeholder="Enter custom category name"
                value={customCategory}
                onChange={(e) => {
                  setCustomCategory(e.target.value);
                  setFormData({ ...formData, category: e.target.value });
                }}
                className="border border-gray-300 p-3 rounded-lg w-full mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Stock Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="inStock"
                  checked={formData.inStock === true}
                  onChange={() => setFormData({ ...formData, inStock: true })}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="inStock"
                  checked={formData.inStock === false}
                  onChange={() => setFormData({ ...formData, inStock: false })}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Out of Stock</span>
              </label>
            </div>
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
