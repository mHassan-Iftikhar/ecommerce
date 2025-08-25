import type { FC } from "react";

interface Order {
  id: string;
  user: string;
  total: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  date?: string;
}

const OrdersSection: FC = () => {
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

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
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-medium mb-6">Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
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
            <div className="mt-3">
              <span className="block text-sm text-gray-500">Status</span>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSection;
