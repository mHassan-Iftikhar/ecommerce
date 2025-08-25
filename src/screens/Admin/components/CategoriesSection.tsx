import { useState, useEffect, type FC } from "react";
import { Search, Trash2, Edit3 } from "lucide-react";
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

interface CategoryData {
  name: string;
  products: Product[];
}

const CategoriesSection: FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addCategoryName, setAddCategoryName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    try {
      const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Group products by category
      const categoryMap = new Map<string, Product[]>();
      
      products.forEach(product => {
        const categoryName = product.category?.trim() || 'Uncategorized';
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, []);
        }
        categoryMap.get(categoryName)!.push(product);
      });

      // Convert to array and sort
      const categoriesData: CategoryData[] = Array.from(categoryMap.entries())
        .map(([name, products]) => ({ name, products }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Error loading categories');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteCategory = (categoryName: string) => {
    setCategoryToDelete(categoryName);
    setShowDeleteModal(true);
  };

  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return;

    try {
      // Get all products
      const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Remove all products from this category
      const updatedProducts = products.filter(product => 
        product.category?.trim() !== categoryToDelete
      );
      
      // Update localStorage
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      // Reload categories
      loadCategories();
      
      toast.success(`Category "${categoryToDelete}" and all its products have been deleted`);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category');
    } finally {
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const handleEditCategory = (categoryName: string) => {
    setCategoryToEdit(categoryName);
    setNewCategoryName(categoryName);
    setShowEditModal(true);
  };

  const saveEditCategory = () => {
    if (!categoryToEdit || !newCategoryName.trim()) {
      toast.error('Please enter a valid category name');
      return;
    }

    if (newCategoryName.trim() === categoryToEdit) {
      // No change, just close modal
      cancelEdit();
      return;
    }

    try {
      // Get all products
      const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Update category name for all products in this category
      const updatedProducts = products.map(product => 
        product.category?.trim() === categoryToEdit 
          ? { ...product, category: newCategoryName.trim() }
          : product
      );
      
      // Update localStorage
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      // Reload categories
      loadCategories();
      
      toast.success(`Category renamed from "${categoryToEdit}" to "${newCategoryName.trim()}"`);
    } catch (error) {
      console.error('Error editing category:', error);
      toast.error('Error editing category');
    } finally {
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setCategoryToEdit(null);
    setNewCategoryName("");
  };

  const handleAddCategory = () => {
    if (!addCategoryName.trim()) {
      toast.error('Please enter a valid category name');
      return;
    }

    // Check if category already exists
    const categoryExists = categories.some(
      category => category.name.toLowerCase() === addCategoryName.trim().toLowerCase()
    );

    if (categoryExists) {
      toast.error('Category already exists');
      return;
    }

    // Create a placeholder product for the new category
    try {
      const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Add a new placeholder product to create the category
      const newProduct: Product = {
        id: Date.now().toString(),
        title: 'Sample Product',
        price: 0,
        image: '',
        description: 'This is a sample product. Please edit or delete it.',
        rating: 5,
        category: addCategoryName.trim()
      };

      const updatedProducts = [...products, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      // Reload categories
      loadCategories();
      
      toast.success(`Category "${addCategoryName.trim()}" has been created with a sample product`);
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Error adding category');
    } finally {
      cancelAdd();
    }
  };

  const cancelAdd = () => {
    setShowAddModal(false);
    setAddCategoryName("");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-medium mb-4 md:mb-0">Categories</h2>
        
        {/* Search Bar and Add Category Button */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">
                    {category.products.length} product{category.products.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditCategory(category.name)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Category"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.name)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Sample products preview */}
              <div className="space-y-2">
                {category.products.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                    <span className="truncate">{product.title}</span>
                  </div>
                ))}
                {category.products.length > 3 && (
                  <div className="text-sm text-gray-400">
                    +{category.products.length - 3} more products
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchQuery ? 'No categories found matching your search.' : 'No categories found.'}
          </div>
          <p className="text-gray-400 mt-2">
            {searchQuery ? 'Try a different search term.' : 'Add some products to see categories here.'}
          </p>
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
              Are you sure you want to delete the category "{categoryToDelete}"? 
              This will also delete all products in this category. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Edit Category
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new category name"
              />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              This will rename the category for all products currently in "{categoryToEdit}".
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelEdit}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditCategory}
                className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add New Category
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={addCategoryName}
                onChange={(e) => setAddCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter category name"
                autoFocus
              />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              A sample product will be created for this category. You can edit or delete it later.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelAdd}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
