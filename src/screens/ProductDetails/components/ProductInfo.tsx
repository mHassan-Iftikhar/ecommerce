import { useState, type FC } from "react";
import { Heart, ExternalLink } from "lucide-react";
import { toast } from "../../../components/ui";
import { AuthManager } from "../../../utils/AuthManager";

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

interface ProductInfoProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
}

const ProductInfo: FC<ProductInfoProps> = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFit, setSelectedFit] = useState("Regular");
  const [selectedColor, setSelectedColor] = useState("White/Bright Crimson");
  const currentUser = AuthManager.getCurrentUser();

  // Mock data for sizes and colors
  const sizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "14", "15"];
  const colors = [
    { name: "White/Bright Crimson", image: product.image },
    { name: "Black/White", image: product.image },
    { name: "Navy/Silver", image: product.image },
    { name: "Gray/Blue", image: product.image },
    { name: "Red/Black", image: product.image },
    { name: "Blue/White", image: product.image },
    { name: "Silver/Black", image: product.image }
  ];

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.warning('Please login to add items to cart');
      return;
    }
    if (!selectedSize) {
      toast.warning('Please select a size');
      return;
    }
    onAddToCart(product.id);
  };

  const handleAddToWishlist = () => {
    if (!currentUser) {
      toast.warning('Please login to add items to wishlist');
      return;
    }
    onAddToWishlist(product.id);
  };

  return (
    <div className="space-y-8 max-w-lg">
      {/* Product Title and Price */}
      <div>
        <h1 className="text-3xl font-medium text-gray-900 mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.category || "Men's Road Running Shoes"}</p>
        <p className="text-xl font-medium text-gray-900">${product.price}</p>
      </div>

      {/* Fit Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Select Fit</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFit("Regular")}
            className={`px-4 py-2 border rounded-lg ${
              selectedFit === "Regular" 
                ? 'border-gray-900 bg-gray-900 text-white' 
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Regular
          </button>
          <button
            onClick={() => setSelectedFit("Extra Wide")}
            className={`px-4 py-2 border rounded-lg ${
              selectedFit === "Extra Wide" 
                ? 'border-gray-900 bg-gray-900 text-white' 
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Extra Wide
          </button>
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color.name)}
              className={`aspect-square rounded-lg border-2 overflow-hidden ${
                selectedColor === color.name 
                  ? 'border-gray-900' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={color.image}
                alt={color.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-900">Select Size</h3>
          <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-900">
            <ExternalLink className="w-4 h-4" />
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`aspect-square border rounded-lg flex items-center justify-center text-sm ${
                selectedSize === size 
                  ? 'border-gray-900 bg-gray-900 text-white' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Bag Button */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Add to Bag
        </button>
        
        <button
          onClick={handleAddToWishlist}
          className="w-full border border-gray-300 text-gray-900 py-4 rounded-full font-medium hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          Favorite
        </button>
      </div>

      {/* Product Details */}
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Shipping</h4>
          <p className="text-gray-600">You'll see our shipping options at checkout.</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Free Pickup</h4>
          <button className="text-gray-900 underline hover:no-underline">
            Find a Store
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="text-gray-700">Shown: {selectedColor}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="text-gray-700">Style: {product.id}</span>
          </div>
        </div>

        <button className="text-gray-900 underline hover:no-underline text-left">
          View Product Details
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
