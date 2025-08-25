import { useState, type FC } from "react";
import { Plus, Edit, Trash2, Image } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
  productCount?: number;
}

const CategoriesSection: FC = () => {
  const [categories, setCategories] = useState<Category[]>(() => 
    JSON.parse(localStorage.getItem('categories') || '[]')
  );
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    if (!formData.name || !formData.image) {
      alert('Please fill in category name and image URL');
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      image: formData.image,
      description: formData.description,
      productCount: 0
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    // Reset form
    setFormData({ name: '', image: '', description: '' });
    setIsAddingCategory(false);
  };

  const handleEditCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setFormData({
        name: category.name,
        image: category.image,
        description: category.description || ''
      });
      setEditingCategory(categoryId);
    }
  };

  const handleSaveEdit = () => {
    if (!formData.name || !formData.image) {
      alert('Please fill in category name and image URL');
      return;
    }

    const updatedCategories = categories.map(category =>
      category.id === editingCategory
        ? { ...category, name: formData.name, image: formData.image, description: formData.description }
        : category
    );

    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    // Reset form
    setFormData({ name: '', image: '', description: '' });
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = categories.filter(category => category.id !== categoryId);
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Management</h2>
          <p className="text-gray-600">Manage product categories and their details</p>
        </div>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Add/Edit Category Form */}
      {(isAddingCategory || editingCategory) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter category description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={editingCategory ? handleSaveEdit : handleAddCategory}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {editingCategory ? 'Save Changes' : 'Add Category'}
            </button>
            <button
              onClick={() => {
                setIsAddingCategory(false);
                setEditingCategory(null);
                setFormData({ name: '', image: '', description: '' });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Image className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-600 mb-4">Create your first category to get started</p>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => handleEditCategory(category.id)}
                    className="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Products: {category.productCount || 0}</span>
                  <span>ID: {category.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
