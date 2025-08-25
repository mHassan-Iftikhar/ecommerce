import { useState, useEffect, type FC } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
  productCount?: number;
}

interface CategorySectionProps {
  categories: Category[];
  onCategoryClick: (categoryName: string) => void;
}

const CategorySection: FC<CategorySectionProps> = ({ onCategoryClick }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    try {
      let allProducts = JSON.parse(localStorage.getItem('products') || '[]');
      
      // If no products exist, create sample products with diverse categories
      if (allProducts.length === 0) {
        const sampleProducts: Product[] = [
          // Electronics
          {
            id: "1",
            title: "iPhone 15 Pro",
            price: 999.99,
            image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
            description: "Latest iPhone with advanced features",
            category: "Electronics",
            inStock: true
          },
          {
            id: "2",
            title: "Samsung Galaxy Watch",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
            description: "Smart watch with health monitoring",
            category: "Electronics",
            inStock: true
          },
          {
            id: "3",
            title: "MacBook Pro",
            price: 1999.99,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
            description: "Powerful laptop for professionals",
            category: "Electronics",
            inStock: true
          },
          
          // Fashion
          {
            id: "4",
            title: "Designer Jeans",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
            description: "Premium denim jeans",
            category: "Fashion",
            inStock: true
          },
          {
            id: "5",
            title: "Leather Jacket",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
            description: "Stylish leather jacket",
            category: "Fashion",
            inStock: true
          },
          {
            id: "6",
            title: "Summer Dress",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
            description: "Light and comfortable summer dress",
            category: "Fashion",
            inStock: true
          },
          
          // Home & Garden
          {
            id: "7",
            title: "Garden Tools Set",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
            description: "Complete set of garden tools",
            category: "Home & Garden",
            inStock: true
          },
          {
            id: "8",
            title: "Indoor Plant",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
            description: "Beautiful indoor plant for home decor",
            category: "Home & Garden",
            inStock: true
          },
          
          // Sports
          {
            id: "9",
            title: "Running Shoes",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
            description: "Comfortable running shoes",
            category: "Sports",
            inStock: true
          },
          {
            id: "10",
            title: "Yoga Mat",
            price: 39.99,
            image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop",
            description: "Premium yoga mat for workouts",
            category: "Sports",
            inStock: true
          },
          
          // Books
          {
            id: "11",
            title: "JavaScript Guide",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            description: "Complete guide to JavaScript programming",
            category: "Books",
            inStock: true
          },
          {
            id: "12",
            title: "Design Patterns",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
            description: "Software design patterns book",
            category: "Books",
            inStock: true
          },
          
          // Beauty
          {
            id: "13",
            title: "Skincare Set",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
            description: "Complete skincare routine set",
            category: "Beauty",
            inStock: true
          },
          {
            id: "14",
            title: "Makeup Palette",
            price: 69.99,
            image: "https://images.unsplash.com/photo-1583241800398-9c932c9eff68?w=400&h=300&fit=crop",
            description: "Professional makeup palette",
            category: "Beauty",
            inStock: true
          }
        ];
        
        localStorage.setItem('products', JSON.stringify(sampleProducts));
        allProducts = sampleProducts;
      }
      
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getProductsByCategory = (categoryName: string): Product[] => {
    return products.filter(product => {
      const productCategory = (product.category || '').trim().toLowerCase();
      const targetCategory = categoryName.toLowerCase();
      return productCategory === targetCategory || 
             (productCategory === '' && categoryName === 'Uncategorized');
    });
  };

  const renderCategorySection = (categoryName: string) => {
    const categoryProducts = getProductsByCategory(categoryName).slice(0, 6);
    
    const content = categoryProducts.length > 0 
      ? categoryProducts.map(product => (
          <div key={product.id} className="w-[270px] group bg-white rounded-2xl shadow p-3 flex gap-3">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-24 h-24 object-cover rounded-lg" 
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 mb-1">{product.title}</div>
              <div className="text-sm font-semibold text-gray-800 mb-2">{formatPrice(product.price)}</div>
            </div>
          </div>
        ))
      : (
          <div className="text-sm text-gray-500">No items found in {categoryName}</div>
        );

    return (
      <section key={categoryName} className="bg-white rounded-2xl shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{categoryName}</h2>
          <button 
            onClick={() => onCategoryClick(categoryName)}
            className="text-sm text-gray-700 hover:underline"
          >
            View all
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {content}
        </div>
      </section>
    );
  };

  // Build unique category list dynamically from products
  const categorySet = new Set<string>();
  products.forEach(product => {
    const categoryName = (product.category || '').trim() || 'Uncategorized';
    categorySet.add(categoryName);
  });

  const categoryNames = Array.from(categorySet).sort((a, b) => a.localeCompare(b));

  if (categoryNames.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-gray-500 text-center py-8">No categories found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {categoryNames.map(categoryName => renderCategorySection(categoryName))}
    </div>
  );
};

export default CategorySection;
