import { useState, type FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageProps {
  image: string;
  title: string;
  images?: string[];
}

const ProductImage: FC<ProductImageProps> = ({ image, title, images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  // Use provided images array or fallback to single image
  const imageArray = images && images.length > 0 ? images : [image];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="lg:sticky lg:top-8 flex gap-4">
      {/* Thumbnail Gallery - Only show if multiple images */}
      {imageArray.length > 1 && (
        <div className="flex flex-col space-y-2">
          {imageArray.slice(0, 8).map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                selectedImageIndex === index 
                  ? 'border-gray-800' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={img}
                alt={`${title} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Main Image with Navigation */}
      <div className="flex-1 relative bg-gray-50 rounded-xl overflow-hidden">
        {!imageError ? (
          <div className="relative aspect-square">
            <img
              src={imageArray[selectedImageIndex]}
              alt={title}
              className="w-full h-full object-contain p-8"
              onError={handleImageError}
            />
            
            {/* Highly Rated Badge */}
            <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium text-gray-700">Highly Rated</span>
            </div>
            
            {/* Navigation Arrows - Only show if multiple images */}
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📷</div>
              <p className="text-gray-500">Image not available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
