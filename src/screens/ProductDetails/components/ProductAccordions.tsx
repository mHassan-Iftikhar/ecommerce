import { type FC } from "react";
import AccordionSection from "./AccordionSection";

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

interface ProductAccordionsProps {
  product: Product;
}

const ProductAccordions: FC<ProductAccordionsProps> = ({ product }) => {
  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      user: "Alex M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Perfect fit and very comfortable. Great for daily runs!",
      verified: true
    },
    {
      id: 2,
      user: "Sarah K.",
      rating: 4,
      date: "1 month ago",
      comment: "Good quality shoes, but took a while to break in. Overall satisfied.",
      verified: true
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      date: "3 weeks ago",
      comment: "Excellent durability and style. Highly recommend!",
      verified: false
    }
  ];

  const ReviewSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-gray-900">{product.rating || 4.5}</div>
          <div className="text-sm text-gray-600">Overall Rating</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{product.reviews || 84}</div>
          <div className="text-sm text-gray-600">Reviews</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">98%</div>
          <div className="text-sm text-gray-600">Recommend</div>
        </div>
      </div>

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{review.user}</span>
                {review.verified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < review.rating ? 'text-black' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>

      <button className="text-gray-900 underline hover:no-underline text-sm">
        View All Reviews
      </button>
    </div>
  );

  const ShippingSection = () => (
    <div className="space-y-4 text-sm">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Standard Shipping</h4>
        <p className="text-gray-600 mb-1">Free on orders over $50</p>
        <p className="text-gray-600">Usually arrives in 3-5 business days</p>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Express Shipping</h4>
        <p className="text-gray-600 mb-1">$9.99 flat rate</p>
        <p className="text-gray-600">Usually arrives in 1-2 business days</p>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Free Store Pickup</h4>
        <p className="text-gray-600 mb-1">Order online, pick up in store</p>
        <p className="text-gray-600">Usually ready within 2 hours</p>
        <button className="text-gray-900 underline hover:no-underline mt-1">
          Find a Store
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">Returns & Exchanges</h4>
        <p className="text-gray-600 mb-2">
          Free returns within 30 days of purchase. Items must be in original condition.
        </p>
        <div className="space-y-1 text-gray-600">
          <p>• Easy online returns process</p>
          <p>• Free return shipping label included</p>
          <p>• Exchanges available for different sizes</p>
        </div>
        <button className="text-gray-900 underline hover:no-underline mt-2">
          Start a Return
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-0">
      <AccordionSection 
        title="Shipping & Returns" 
        defaultOpen={false}
      >
        <ShippingSection />
      </AccordionSection>

      <AccordionSection 
        title="Reviews" 
        rating={product.rating || 4.5}
        reviewCount={product.reviews || 84}
        defaultOpen={false}
      >
        <ReviewSection />
      </AccordionSection>
    </div>
  );
};

export default ProductAccordions;
