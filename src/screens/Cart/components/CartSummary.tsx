import React from 'react';

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onPlaceOrder: () => void;
  onTrackOrders: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  total, 
  itemCount, 
  onPlaceOrder, 
  onTrackOrders 
}) => {
  const shipping = 0; // Free shipping
  const tax = total * 0.1; // 10% tax
  const finalTotal = total + shipping + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Items ({itemCount})</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <hr className="border-gray-300" />
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={onPlaceOrder}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
      >
        Proceed to Checkout
      </button>
      
      <div className="flex justify-between gap-3 mt-4">
        <button
          onClick={onTrackOrders}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Track Orders
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
