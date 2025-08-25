import type { FC } from "react";

interface SearchAndFilterProps {
  searchValue: string;
  minPrice: string;
  maxPrice: string;
  onSearchChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  className?: string;
}

const SearchAndFilter: FC<SearchAndFilterProps> = ({
  searchValue,
  minPrice,
  maxPrice,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  className = "w-full p-5"
}) => {
  return (
    <div className={className}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input 
                type="text" 
                id="search" 
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by name or description..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Min Price */}
            <div>
              <label htmlFor="min" className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input 
                type="number" 
                id="min" 
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                placeholder="0" 
                min="0" 
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Max Price */}
            <div>
              <label htmlFor="max" className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input 
                type="number" 
                id="max" 
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                placeholder="1000" 
                min="0" 
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
