import { useState, useEffect, type FC } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";

interface CategoriesSectionProps {
  className?: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

const CategoriesSection: FC<CategoriesSectionProps> = ({
  className = "p-5"
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadRandomCategories();
  }, []);

  const loadRandomCategories = () => {
    try {
      let allCategories = JSON.parse(localStorage.getItem('categories') || '[]');
      
      // If no categories exist, create sample categories
      if (allCategories.length === 0) {
        const sampleCategories = [
          {
            id: '1',
            name: 'Electronics',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop',
            description: 'Latest gadgets and devices'
          },
          {
            id: '2',
            name: 'Fashion',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
            description: 'Trendy clothing and accessories'
          },
          {
            id: '3',
            name: 'Home & Garden',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
            description: 'Everything for your home'
          },
          {
            id: '4',
            name: 'Sports',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
            description: 'Sports equipment and gear'
          }
        ];
        
        localStorage.setItem('categories', JSON.stringify(sampleCategories));
        allCategories = sampleCategories;
      }
      
      // Get 2 random categories
      const shuffled = allCategories.sort(() => 0.5 - Math.random());
      setCategories(shuffled.slice(0, 2));
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  return (
    <div className={className}>
      <SectionHeader title="Popular Categories" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category-details?category=${encodeURIComponent(category.name)}`}
            className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="w-full flex items-center justify-center">
        <Link to="/categories">
          <button className="mt-4 px-4 py-2 cursor-pointer text-sm sm:text-base hover:bg-gray-100 transition-colors">
            Show all Categories <span className="ml-2">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesSection;
