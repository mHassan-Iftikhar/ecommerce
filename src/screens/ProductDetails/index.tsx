import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header, Footer } from "../../components";
import { 
  ProductDetailsHeader, 
  ProductImage, 
  ProductInfo,
  RelatedProducts
} from "./components";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

const ProductDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = (productId: string) => {
    try {
      const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      const foundProduct = products.find((p) => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        document.title = `${foundProduct.title} - E-commerce Store`;
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId: string) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      alert('Please login to add items to cart');
      return;
    }

    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const userEmail = currentUser.email;
      let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`) || '[]');
      const existingItem = userCart.find((item: any) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        userCart.push({ ...productToAdd, quantity: 1 });
      }

      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));
      alert('Product added to cart!');
    }
  };

  const handleAddToWishlist = (productId: string) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      alert('Please login to add items to wishlist');
      return;
    }

    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const userEmail = currentUser.email;
      let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      const existingItem = userWishlist.find((item: Product) => item.id === productId);

      if (existingItem) {
        alert('Product is already in your wishlist!');
      } else {
        userWishlist.push(productToAdd);
        localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(userWishlist));
        alert('Product added to wishlist!');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="h-96 lg:h-[500px] bg-gray-200 rounded-xl"></div>
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductDetailsHeader />
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <div className="text-center py-16">
              <div className="text-red-500 text-2xl mb-6 font-semibold">Product not found</div>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                ← Back to Products
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetailsHeader />
        
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductImage 
              image={product.image} 
              title={product.title} 
            />
            
            <ProductInfo 
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>

        {/* Related Products Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailsScreen;
