import type { FC } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";

interface ProductsSectionProps {
  className?: string;
}

const ProductsSection: FC<ProductsSectionProps> = ({
  className = "p-5"
}) => {
  return (
    <div className={className}>
      <SectionHeader title="Products" />
      
      <div id="productsContainer" className="flex flex-wrap gap-5 justify-center">
        {/* Products will be dynamically loaded here */}
      </div>
      
      <div className="w-full flex items-center justify-center">
        <Link to="/products">
          <button className="mt-4 px-4 py-2 cursor-pointer text-sm sm:text-base hover:bg-gray-100 transition-colors">
            Show all Products <span className="ml-2">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsSection;
