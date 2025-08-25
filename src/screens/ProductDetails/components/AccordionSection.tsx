import { useState, type FC } from "react";
import { ChevronDown, Star } from "lucide-react";

interface AccordionSectionProps {
  title: string;
  rating?: number;
  reviewCount?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionSection: FC<AccordionSectionProps> = ({ 
  title, 
  rating, 
  reviewCount, 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'fill-current text-black' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-medium text-gray-900">{title}</h3>
          {rating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(rating)}
              </div>
              {reviewCount && (
                <span className="text-gray-600">({reviewCount})</span>
              )}
            </div>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {isOpen && (
        <div className="pb-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
