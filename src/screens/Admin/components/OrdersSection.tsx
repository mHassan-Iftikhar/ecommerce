import { useState, type FC } from "react";
import { toast } from "../../../components/ui";

interface Order {
  id: string;
  user: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date?: string;
}

type OrderFilter = 'All' | 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

const OrdersSection: FC = () => {
  const [activeFilter, setActiveFilter] = useState<OrderFilter>('All');
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

  // Filter orders based on active filter
  const filteredOrders = activeFilter === 'All' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const orderFilters: OrderFilter[] = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  // Get count for each status
  const getStatusCount = (status: OrderFilter) => {
    if (status === 'All') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    // Show confirmation for critical status changes
    if (newStatus === 'Cancelled' || newStatus === 'Delivered') {
      const confirmMessage = newStatus === 'Cancelled' 
        ? 'Are you sure you want to cancel this order?' 
        : 'Are you sure this order has been delivered?';
      
      if (!window.confirm(confirmMessage)) {
        return;
      }
    }

    try {
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      // Show success message
      toast.success(`Order #${orderId} status updated to ${newStatus}`);
      
      // Force re-render by updating the component
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  if (orders.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-medium mb-6">Orders</h2>
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No orders found.
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getFilterButtonColor = (filter: OrderFilter) => {
    return activeFilter === filter
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-6">Orders Management</h2>
        
        {/* Order Status Filter Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter by Status</h3>
          <div className="flex flex-wrap gap-3">
            {orderFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 ${getFilterButtonColor(filter)}`}
              >
                {filter}
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                  {getStatusCount(filter)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
            {activeFilter !== 'All' && (
              <span className="ml-1">
                for <span className="font-medium text-gray-900">{activeFilter}</span> status
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No orders found for {activeFilter} status.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Order ID</span>
              <span className="text-lg font-semibold text-gray-800">#{order.id}</span>
            </div>
            <div className="mb-2">
              <span className="block text-sm text-gray-500">User</span>
              <span className="text-base text-gray-700">{order.user}</span>
            </div>
            <div className="mb-2">
              <span className="block text-sm text-gray-500">Total</span>
              <span className="text-base font-medium text-green-600">${order.total}</span>
            </div>
            {order.date && (
              <div className="mb-3">
                <span className="block text-sm text-gray-500">Date</span>
                <span className="text-base text-gray-700">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
            )}
            <div className="mt-3 mb-4">
              <span className="block text-sm text-gray-500 mb-2">Current Status</span>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            
            {/* Status Change Dropdown */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label htmlFor={`status-${order.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                Update Order Status
              </label>
              <select
                id={`status-${order.id}`}
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white hover:border-gray-400 transition-colors"
              >
                <option value="Pending">🟡 Pending - Order received</option>
                <option value="Processing">🔵 Processing - Being prepared</option>
                <option value="Shipped">🟣 Shipped - On the way</option>
                <option value="Delivered">🟢 Delivered - Completed</option>
                <option value="Cancelled">🔴 Cancelled - Order cancelled</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select new status to update this order
              </p>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default OrdersSection;
