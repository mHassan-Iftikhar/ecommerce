import { type FC, useState } from "react";

interface ProductImageProps {
  image: string;
  title: string;
}

const ProductImage: FC<ProductImageProps> = ({ image, title }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="space-y-4">
      {!imageError ? (
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-square lg:aspect-[4/5]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        </div>
      ) : (
        <div className="w-full aspect-square lg:aspect-[4/5] bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <p className="text-gray-500">Image not available</p>
          </div>
        </div>
      )}
      
      {/* Thumbnail images */}
      <div className="flex gap-3">
        <div className="w-20 h-20 rounded-lg bg-gray-50 flex-shrink-0 border-2 border-gray-300 overflow-hidden">
          <img 
            src={image} 
            alt={`${title} thumbnail`} 
            className="w-full h-full object-contain p-1" 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
