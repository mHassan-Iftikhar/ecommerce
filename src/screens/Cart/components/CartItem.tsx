import React, { useState } from 'react';
import { Plus, Minus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface CartItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    description: string;
    category?: string;
  };
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-24 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 
            className="text-lg font-semibold text-gray-900 mb-2"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {item.title}
          </h3>
          
          {item.category && (
            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
          )}
          
          {/* Description with Accordion */}
          {item.description && (
            <div className="mb-3">
              <div 
                className={`text-gray-600 text-sm transition-all duration-200 ${
                  isDescriptionExpanded ? '' : 'line-clamp-2'
                }`}
                style={
                  !isDescriptionExpanded ? {
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  } : {}
                }
              >
                {item.description}
              </div>
              {item.description.length > 100 && (
                <button
                  onClick={toggleDescription}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm mt-1 transition-colors"
                >
                  {isDescriptionExpanded ? (
                    <>
                      Show less
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show more
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
          
          <p className="text-lg font-semibold text-gray-900 mb-3">
            ${item.price.toFixed(2)}
          </p>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-semibold w-12 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="text-right flex-shrink-0">
          <p className="text-xl font-bold text-gray-900 mb-4">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
