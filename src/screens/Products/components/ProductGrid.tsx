import type { FC } from "react";
import ProductCard, { type Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
  onProductClick: (productId: string) => void;
  className?: string;
}

const ProductGrid: FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onAddToWishlist,
  onProductClick,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5 max-w-6xl mx-auto"
}) => {
  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="text-gray-500 text-xl mb-4">No products found</div>
        <div className="text-gray-400">Try adjusting your search or filters</div>
      </div>
    );
  }

  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
