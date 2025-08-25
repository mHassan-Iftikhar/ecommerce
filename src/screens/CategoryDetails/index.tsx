import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header, Footer } from "../../components";
import { toast } from "../../components/ui";
import { CategoryDetailsHeader, CategoryProductsGrid } from "./components";

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

const CategoryDetailsScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const categoryName = searchParams.get('category') || '';

  useEffect(() => {
    if (categoryName) {
      loadCategoryProducts(categoryName);
      document.title = `${categoryName} - E-commerce Store`;
    } else {
      setLoading(false);
    }
  }, [categoryName]);

  const loadCategoryProducts = (category: string) => {
    try {
      const allProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Filter products by category (case-insensitive)
      const filteredProducts = allProducts.filter(product => {
        const productCategory = (product.category || '').toLowerCase().trim();
        const searchCategory = category.toLowerCase().trim();
        
        // Also search in title and description for broader matches
        const searchText = `${product.title || ''} ${product.description || ''} ${product.category || ''}`.toLowerCase();
        
        return productCategory === searchCategory || searchText.includes(searchCategory);
      });

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error loading category products:', error);
      setProducts([]);
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

    const allProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = allProducts.find((p) => p.id === productId);

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

    const allProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = allProducts.find((p) => p.id === productId);

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

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (!categoryName) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="text-red-500 text-xl font-semibold mb-4">Category not specified</div>
            <p className="text-gray-600 mb-6">Please select a category to view products.</p>
            <button
              onClick={() => navigate('/categories')}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              ← Back to Categories
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Header />
        
        {/* Loading Header */}
        <div className="w-full mb-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-10 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
        
        {/* Loading Grid */}
        <main className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-4 h-80">
                <div className="animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-full h-56 bg-gray-200 rounded-xl"></div>
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
      
      {/* Category Details Header */}
      <div className="w-full mb-8">
        <CategoryDetailsHeader categoryName={categoryName} />
      </div>
      
      {/* Products Grid */}
      <main className="w-full">
        <CategoryProductsGrid
          products={products}
          categoryName={categoryName}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onProductClick={handleProductClick}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetailsScreen;
