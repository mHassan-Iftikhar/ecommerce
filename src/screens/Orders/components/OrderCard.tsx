import React from 'react';
import { Calendar, DollarSign, Eye } from 'lucide-react';

interface OrderCardProps {
  order: {
    id: string;
    user: string;
    total: number;
    status: string;
    date: string;
    items: any[];
  };
  getStatusColor: (status: string) => string;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, getStatusColor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(order.date).toLocaleDateString()}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Items:</span>
          <span className="font-medium">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            Total:
          </span>
          <span className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" />
          Track Order
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
