import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../components";
import { toast } from "../../components/ui";
import { CategoriesHeader, CategorySection } from "./components";

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

interface CategoryData {
  name: string;
  products: Product[];
}

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    document.title = "Categories - E-commerce Store";
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
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId: string) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      toast.warning('Please login to add items to cart');
      navigate('/auth/login');
      return;
    }

    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const userEmail = currentUser.email;
      let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`) || '[]');
      const existingItem = userCart.find((item: any) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        userCart.push({ ...productToAdd, quantity: 1 });
      }

      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));
      toast.success('Product added to cart!');
    }
  };

  const handleAddToWishlist = (productId: string) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      toast.warning('Please login to add items to wishlist');
      navigate('/auth/login');
      return;
    }

    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const userEmail = currentUser.email;
      let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      const existingItem = userWishlist.find((item: Product) => item.id === productId);

      if (existingItem) {
        toast.warning('Product is already in your wishlist!');
      } else {
        userWishlist.push(productToAdd);
        localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(userWishlist));
        toast.success('Product added to wishlist!');
      }
    }
  };

  const handleViewCategory = (categoryName: string) => {
    navigate(`/category-details?category=${encodeURIComponent(categoryName)}`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Header />
        
        {/* Loading Header - Full Width */}
        <div className="w-full mb-8">
          <div className="animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-10 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
        
        {/* Loading Sections - Full Width */}
        <main className="w-full">
          <div className="space-y-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex gap-4">
                  {Array.from({ length: 3 }, (_, j) => (
                    <div key={j} className="w-[270px] bg-gray-100 rounded-2xl p-3">
                      <div className="flex gap-3">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header />
      
      {/* Categories Header - Full Width */}
      <div className="w-full mb-8">
        <CategoriesHeader />
      </div>
      
      {/* Category Sections - Full Width */}
      <main className="w-full">
        <div className="flex flex-col gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategorySection
                key={category.name}
                title={category.name}
                products={category.products}
                onViewCategory={handleViewCategory}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onProductClick={handleProductClick}
              />
            ))
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <div className="text-gray-500 text-lg">No categories found.</div>
                <p className="text-gray-400 mt-2">Add some products to see categories here.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesScreen;
