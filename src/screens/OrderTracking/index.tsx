import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Header, Footer } from "../../components";
import { toast } from "../../components/ui";
import { AuthManager } from "../../utils/AuthManager";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  category?: string;
}

interface Order {
  id: string;
  user: string;
  items: CartItem[];
  total: number;
  status: string;
  date: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
}

interface TrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

const OrderTracking = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrder();
    document.title = "Track Order - E-commerce Store";
  }, [orderId]);

  const loadOrder = () => {
    try {
      const currentUser = AuthManager.getCurrentUser();
      
      if (!currentUser) {
        navigate('/auth/login');
        return;
      }

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: Order) => 
        o.id === orderId && o.user === currentUser.email
      );

      if (!foundOrder) {
        toast.error('Order not found');
        navigate('/');
        return;
      }

      setOrder(foundOrder);
    } catch (error) {
      console.error('Error loading order:', error);
      toast.error('Error loading order');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const getTrackingSteps = (): TrackingStep[] => {
    const orderDate = new Date(order?.date || '');
    const processingDate = new Date(orderDate);
    const shippedDate = new Date(orderDate);
    const deliveryDate = new Date(orderDate);
    
    shippedDate.setDate(shippedDate.getDate() + 1);
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    const steps: TrackingStep[] = [
      {
        title: "Order Placed",
        description: "Your order has been received and is being processed",
        date: orderDate.toLocaleDateString(),
        completed: true,
        current: false
      },
      {
        title: "Processing",
        description: "We're preparing your items for shipment",
        date: processingDate.toLocaleDateString(),
        completed: order?.status !== 'Processing',
        current: order?.status === 'Processing'
      },
      {
        title: "Shipped",
        description: "Your order is on its way to you",
        date: shippedDate.toLocaleDateString(),
        completed: order?.status === 'Delivered',
        current: order?.status === 'Shipped'
      },
      {
        title: "Delivered",
        description: "Your order has been delivered",
        date: deliveryDate.toLocaleDateString(),
        completed: order?.status === 'Delivered',
        current: false
      }
    ];

    return steps;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'shipped':
        return 'text-green-600 bg-green-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getEstimatedDelivery = () => {
    const orderDate = new Date(order?.date || '');
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading order tracking...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const trackingSteps = getTrackingSteps();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">Order #{order.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Tracking Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {order.status !== 'Delivered' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-900">Estimated Delivery</p>
                      <p className="text-blue-700">{getEstimatedDelivery()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tracking Timeline */}
              <div className="relative">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 pb-8 last:pb-0">
                    {/* Timeline Icon */}
                    <div className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.completed 
                        ? 'bg-green-100 border-green-500 text-green-600' 
                        : step.current 
                        ? 'bg-blue-100 border-blue-500 text-blue-600' 
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : index === 0 ? (
                        <Package className="w-5 h-5" />
                      ) : index === 1 ? (
                        <Clock className="w-5 h-5" />
                      ) : index === 2 ? (
                        <Truck className="w-5 h-5" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                      
                      {/* Timeline Line */}
                      {index < trackingSteps.length - 1 && (
                        <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-16 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm mb-1 ${
                        step.completed || step.current ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                      {(step.completed || step.current) && (
                        <p className="text-xs text-gray-500">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </h3>
                  <div className="text-gray-700 text-sm">
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="text-gray-700 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{order.user}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                      <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="text-gray-900">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span className="text-gray-900">${(order.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${(order.total * 1.08).toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/products"
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-center text-sm font-semibold hover:bg-black transition-colors block"
                >
                  Shop Again
                </Link>
                <button className="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;
