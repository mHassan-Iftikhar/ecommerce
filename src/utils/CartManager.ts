interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  category?: string;
}

export class CartManager {
  static getCartKey(userEmail: string): string {
    return `cart_${userEmail}`;
  }

  static getCart(userEmail: string): CartItem[] {
    try {
      const cart = localStorage.getItem(this.getCartKey(userEmail));
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  }

  static saveCart(userEmail: string, cart: CartItem[]): void {
    try {
      localStorage.setItem(this.getCartKey(userEmail), JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  static addToCart(userEmail: string, item: CartItem): boolean {
    try {
      const cart = this.getCart(userEmail);
      const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += item.quantity;
      } else {
        cart.push(item);
      }
      
      this.saveCart(userEmail, cart);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  }

  static removeFromCart(userEmail: string, itemId: string): boolean {
    try {
      const cart = this.getCart(userEmail);
      const updatedCart = cart.filter(item => item.id !== itemId);
      this.saveCart(userEmail, updatedCart);
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  }

  static updateQuantity(userEmail: string, itemId: string, quantity: number): boolean {
    try {
      if (quantity <= 0) {
        return this.removeFromCart(userEmail, itemId);
      }

      const cart = this.getCart(userEmail);
      const itemIndex = cart.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        cart[itemIndex].quantity = quantity;
        this.saveCart(userEmail, cart);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  }

  static clearCart(userEmail: string): void {
    try {
      localStorage.removeItem(this.getCartKey(userEmail));
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  static getCartCount(userEmail: string): number {
    const cart = this.getCart(userEmail);
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  static getCartTotal(userEmail: string): number {
    const cart = this.getCart(userEmail);
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

export default CartManager;
