import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const EmptyOrders: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
      <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Package className="w-4 h-4" />
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyOrders;
