import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, Eye, Calendar, DollarSign } from "lucide-react";
import { Header, Footer } from "../../components";
import { AuthManager } from "../../utils/AuthManager";

interface Order {
  id: string;
  user: string;
  total: number;
  status: string;
  date: string;
  items: any[];
}

const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = AuthManager.getCurrentUser();
    setCurrentUser(user);
    
    if (user) {
      loadUserOrders(user.email);
    }
  }, []);

  const loadUserOrders = (userEmail: string) => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = allOrders.filter((order: Order) => order.user === userEmail);
      setOrders(userOrders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Please login to view your orders</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Orders Header */}
        <div className="w-full mb-8 px-4 md:px-10 pt-16">
          <div className="flex items-center justify-end gap-3 mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900">My Orders</h1>
            <div className="rounded-full w-6 sm:w-8 h-6 sm:h-8 border border-gray-800 flex justify-center items-center">
              <div className="w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-gray-800"></div>
            </div>
          </div>
          <p className="text-gray-600 text-sm md:text-base text-right">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        <div className="max-w-6xl mx-auto px-4 md:px-10">
          {orders.length === 0 ? (
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
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                          <DollarSign className="w-4 h-4" />
                          {order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      {order.items.length > 0 && (
                        <span>Including {order.items[0].title}{order.items.length > 1 ? ` and ${order.items.length - 1} more item${order.items.length > 2 ? 's' : ''}` : ''}</span>
                      )}
                    </div>
                    <Link
                      to={`/order-tracking/${order.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Track Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrdersScreen;
