import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { CategoriesHeader, CategorySection } from "./components";
import { Header, Footer } from "../../components";

interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
  productCount?: number;
}

const CategoriesScreen: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    try {
      let allCategories = JSON.parse(localStorage.getItem('categories') || '[]');
      
      // If no categories exist, create sample categories
      if (allCategories.length === 0) {
        const sampleCategories = [
          {
            id: '1',
            name: 'Electronics',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
            description: 'Latest gadgets and electronic devices',
            productCount: 25
          },
          {
            id: '2',
            name: 'Fashion',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
            description: 'Trendy clothing and accessories',
            productCount: 18
          },
          {
            id: '3',
            name: 'Home & Garden',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
            description: 'Everything for your home and garden',
            productCount: 32
          },
          {
            id: '4',
            name: 'Sports',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            description: 'Sports equipment and fitness gear',
            productCount: 15
          },
          {
            id: '5',
            name: 'Books',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
            description: 'Books and educational materials',
            productCount: 42
          },
          {
            id: '6',
            name: 'Beauty',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
            description: 'Beauty and personal care products',
            productCount: 28
          }
        ];
        
        localStorage.setItem('categories', JSON.stringify(sampleCategories));
        allCategories = sampleCategories;
      }
      
      setCategories(allCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CategoriesHeader />
        
        <CategorySection 
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesScreen;
