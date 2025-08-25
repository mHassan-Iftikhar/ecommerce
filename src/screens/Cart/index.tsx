import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, Package } from "lucide-react";
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

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadCart();
    document.title = "Shopping Cart - E-commerce Store";
  }, []);

  const checkAuthAndLoadCart = () => {
    const currentUser = AuthManager.getCurrentUser();
    
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    loadCart();
  };

  const loadCart = () => {
    try {
      const currentUser = AuthManager.getCurrentUser();
      const userEmail = currentUser?.email;
      const cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`) || '[]');
      setCartItems(cart);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Error loading cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const currentUser = AuthManager.getCurrentUser();
    const userEmail = currentUser?.email;
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
    toast.success('Quantity updated');
  };

  const removeFromCart = (productId: string) => {
    const currentUser = AuthManager.getCurrentUser();
    const userEmail = currentUser?.email;
    
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
    toast.success('Item removed from cart');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.warning('Your cart is empty!');
      return;
    }
    
    navigate('/checkout');
  };

  const handleTrackOrders = () => {
    // Get user's orders and navigate to the most recent one for tracking
    const currentUser = AuthManager.getCurrentUser();
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = orders.filter((order: any) => order.user === currentUser?.email);
    
    if (userOrders.length === 0) {
      toast.info('No orders found. Place an order first!');
      return;
    }
    
    // Navigate to the most recent order tracking
    const latestOrder = userOrders[userOrders.length - 1];
    navigate(`/order-tracking/${latestOrder.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading cart...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/products" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Start shopping to add items to your cart!</p>
              <Link 
                to="/products" 
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cart Items ({cartItems.length})
              </h2>
              
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 mb-3">
                        ${item.price.toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-semibold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 mb-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <div className="mt-4 flex justify-between items-center">
                  <Link 
                    to="/products" 
                    className="text-gray-600 hover:text-gray-900 text-sm border border-gray-300 px-3 py-2 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  
                  <button
                    onClick={handleTrackOrders}
                    className="text-gray-600 hover:text-gray-900 text-sm border border-gray-300 px-3 py-2 rounded-lg hover:border-gray-400 transition-colors flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Track Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
